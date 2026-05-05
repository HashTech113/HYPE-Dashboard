"""Authentication primitives — password hashing, JWT issue/verify, user CRUD.

The login flow is:
    POST /api/auth/login {username, password}
        -> verify_password against users.password_hash
        -> create_access_token({sub, role, company})
        -> client stores the token and sends it as Authorization: Bearer <token>

Roles supported: 'admin' (full access) and 'hr' (scoped to their company).
"""

from __future__ import annotations

import logging
import secrets
import time
import uuid
from dataclasses import dataclass
from typing import Optional

import bcrypt
import jwt

from ..config import JWT_ALGORITHM, JWT_SECRET, JWT_TTL_SECONDS, SEED_ADMIN_PASSWORD, SEED_ADMIN_USERNAME
from ..db import connect

log = logging.getLogger(__name__)


# Per-company HR accounts seeded on first boot. The (username, company,
# display_name) tuples mirror what was previously hardcoded in the frontend
# auth.ts, so existing operators can keep their workflow.
_HR_SEEDS: tuple[tuple[str, str, str], ...] = (
    ("wawu",          "WAWU",            "WAWU HR"),
    ("cap",           "CAP",             "CAP HR"),
    ("owlytics",      "Owlytics",        "Owlytics HR"),
    ("grow",          "Grow",            "Grow HR"),
    ("perform100x",   "Perform100x",     "Perform100x HR"),
    ("sib",           "SIB",             "SIB HR"),
    ("careercafeco",  "career cafe co",  "Career Cafe Co HR"),
    ("ceo2",          "CEO2",            "CEO2 HR"),
    ("karumitra",     "karu mitra",      "Karu Mitra HR"),
    ("legalquotient", "Legal Quotient",  "Legal Quotient HR"),
    ("startuptv",     "Startup TV",      "Startup TV HR"),
)


@dataclass(frozen=True)
class User:
    id: str
    username: str
    role: str
    company: str
    display_name: str
    avatar_url: str
    is_active: bool


# ---- password hashing -------------------------------------------------------

def hash_password(plain: str) -> str:
    """bcrypt with cost=12. Returns a UTF-8 string for sqlite storage."""
    if not plain:
        raise ValueError("password must be non-empty")
    return bcrypt.hashpw(plain.encode("utf-8"), bcrypt.gensalt(rounds=12)).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    if not plain or not hashed:
        return False
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except (ValueError, TypeError):
        return False


# ---- JWT --------------------------------------------------------------------

def create_access_token(*, user_id: str, username: str, role: str, company: str) -> str:
    now = int(time.time())
    payload = {
        "sub": user_id,
        "username": username,
        "role": role,
        "company": company,
        "iat": now,
        "exp": now + JWT_TTL_SECONDS,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict:
    """Raises jwt.PyJWTError on invalid / expired tokens — callers convert
    to HTTP 401."""
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])


# ---- user CRUD --------------------------------------------------------------

def _row_to_user(row) -> User:
    return User(
        id=str(row["id"]),
        username=str(row["username"]),
        role=str(row["role"]),
        company=str(row["company"] or ""),
        display_name=str(row["display_name"] or row["username"]),
        avatar_url=str(row["avatar_url"] or ""),
        is_active=bool(row["is_active"]),
    )


_USER_COLUMNS = "id, username, role, company, display_name, avatar_url, is_active"


def get_by_username(username: str) -> Optional[tuple[User, str]]:
    """Returns (User, password_hash) or None. The hash is returned separately
    so callers can verify without leaking it through the User dataclass."""
    if not username:
        return None
    with connect() as conn:
        row = conn.execute(
            f"SELECT {_USER_COLUMNS}, password_hash FROM users WHERE username = ?",
            (username.strip(),),
        ).fetchone()
    if not row:
        return None
    return _row_to_user(row), str(row["password_hash"])


def get_by_id(user_id: str) -> Optional[User]:
    if not user_id:
        return None
    with connect() as conn:
        row = conn.execute(
            f"SELECT {_USER_COLUMNS} FROM users WHERE id = ?", (user_id,)
        ).fetchone()
    return _row_to_user(row) if row else None


def update_password(user_id: str, new_plain: str) -> bool:
    new_hash = hash_password(new_plain)
    with connect() as conn:
        cur = conn.execute(
            "UPDATE users SET password_hash = ? WHERE id = ?", (new_hash, user_id)
        )
    return cur.rowcount > 0


def update_profile(
    user_id: str,
    *,
    display_name: Optional[str] = None,
    avatar_url: Optional[str] = None,
    username: Optional[str] = None,
) -> Optional[User]:
    sets: list[str] = []
    params: list = []
    if display_name is not None:
        sets.append("display_name = ?")
        params.append(display_name)
    if avatar_url is not None:
        sets.append("avatar_url = ?")
        params.append(avatar_url)
    if username is not None:
        sets.append("username = ?")
        params.append(username)
    if not sets:
        return get_by_id(user_id)
    params.append(user_id)
    with connect() as conn:
        conn.execute(f"UPDATE users SET {', '.join(sets)} WHERE id = ?", params)
    return get_by_id(user_id)


def seed_users_if_empty() -> None:
    """Insert default admin + HR accounts on first boot. Idempotent: a row
    already in the table is left alone, so operators can rotate passwords
    without them being overwritten on restart."""
    now = _utc_now_iso()
    with connect() as conn:
        existing = {
            row["username"]
            for row in conn.execute("SELECT username FROM users").fetchall()
        }

        def _insert(username: str, password: str, role: str, company: str, display_name: str) -> None:
            if username in existing:
                return
            conn.execute(
                "INSERT INTO users (id, username, password_hash, role, company, "
                "display_name, avatar_url, is_active, created_at) "
                "VALUES (?, ?, ?, ?, ?, ?, '', 1, ?)",
                (
                    f"usr-{uuid.uuid4().hex[:10]}",
                    username,
                    hash_password(password),
                    role,
                    company,
                    display_name,
                    now,
                ),
            )
            log.info("seeded user %r (role=%s)", username, role)

        _insert(SEED_ADMIN_USERNAME, SEED_ADMIN_PASSWORD, "admin", "", "Admin")
        for username, company, display_name in _HR_SEEDS:
            # Use the same `<username>@123` convention the frontend used so
            # nothing breaks for existing operators on first deploy.
            _insert(username, f"{username}@123", "hr", company, display_name)


def _utc_now_iso() -> str:
    from datetime import datetime, timezone
    return datetime.now(timezone.utc).isoformat()


# ---- API key for camera ingest ---------------------------------------------

def constant_time_eq(a: str, b: str) -> bool:
    return secrets.compare_digest(a or "", b or "")
