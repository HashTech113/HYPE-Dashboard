"""SQLite connection + schema for attendance_logs and snapshot_logs."""

from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from typing import Iterator

from .config import DB_PATH

SCHEMA = """
CREATE TABLE IF NOT EXISTS snapshot_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    image_path TEXT NOT NULL UNIQUE,
    image_data TEXT
);

CREATE TABLE IF NOT EXISTS attendance_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    image_path TEXT NOT NULL UNIQUE,
    image_data TEXT
);

CREATE TABLE IF NOT EXISTS employees (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    employee_id TEXT NOT NULL,
    company TEXT NOT NULL DEFAULT '',
    department TEXT NOT NULL DEFAULT '',
    shift TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT 'Employee',
    dob TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS attendance_corrections (
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    entry_iso TEXT,
    exit_iso TEXT,
    total_break_seconds INTEGER,
    missing_checkout_resolved INTEGER NOT NULL DEFAULT 0,
    note TEXT,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (name, date)
);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'hr')),
    company TEXT NOT NULL DEFAULT '',
    display_name TEXT NOT NULL DEFAULT '',
    avatar_url TEXT NOT NULL DEFAULT '',
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_snapshot_logs_timestamp ON snapshot_logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_attendance_logs_timestamp ON attendance_logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_snapshot_logs_name ON snapshot_logs (name);
CREATE INDEX IF NOT EXISTS idx_attendance_logs_name ON attendance_logs (name);
CREATE INDEX IF NOT EXISTS idx_employees_name ON employees (name);
CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
"""


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(str(DB_PATH), isolation_level=None, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode = WAL")
    conn.execute("PRAGMA synchronous = NORMAL")
    # Wait up to 5s for a write lock instead of failing immediately. Capture,
    # backfill, replay, and uvicorn all open their own connections; without
    # this PRAGMA a busy WAL writer would surface as "database is locked".
    conn.execute("PRAGMA busy_timeout = 5000")
    return conn


@contextmanager
def connect() -> Iterator[sqlite3.Connection]:
    conn = get_connection()
    try:
        yield conn
    finally:
        conn.close()


def _column_exists(conn: sqlite3.Connection, table: str, column: str) -> bool:
    rows = conn.execute(f"PRAGMA table_info({table})").fetchall()
    return any(row["name"] == column for row in rows)


def init_schema() -> None:
    with connect() as conn:
        conn.executescript(SCHEMA)
        for table in ("snapshot_logs", "attendance_logs"):
            if not _column_exists(conn, table, "image_data"):
                conn.execute(f"ALTER TABLE {table} ADD COLUMN image_data TEXT")
        if not _column_exists(conn, "employees", "dob"):
            conn.execute("ALTER TABLE employees ADD COLUMN dob TEXT NOT NULL DEFAULT ''")
        if not _column_exists(conn, "employees", "image_url"):
            conn.execute("ALTER TABLE employees ADD COLUMN image_url TEXT NOT NULL DEFAULT ''")
