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
    image_data TEXT,
    camera_id TEXT
);

CREATE TABLE IF NOT EXISTS attendance_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    image_path TEXT NOT NULL UNIQUE,
    image_data TEXT,
    camera_id TEXT,
    -- Multi-source attendance: 'local_camera' for capture.py / face recognition
    -- rows, 'external_api' for rows imported from a third-party HR system via
    -- POST /api/external-attendance/sync. Reports + dashboards merge both
    -- sources transparently — the column exists for filtering / auditing.
    source TEXT NOT NULL DEFAULT 'local_camera',
    -- Vendor-side event id from the external system; used to dedup imports.
    -- NULL for local_camera rows.
    external_event_id TEXT,
    -- Normalized to one of: IN, OUT, BREAK_OUT, BREAK_IN. NULL for camera
    -- rows (which are just "presence ticks", not typed punches).
    event_type TEXT
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
    image_url TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    mobile TEXT NOT NULL DEFAULT '',
    salary_package TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS attendance_corrections (
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    entry_iso TEXT,
    exit_iso TEXT,
    total_break_seconds INTEGER,
    missing_checkout_resolved INTEGER NOT NULL DEFAULT 0,
    note TEXT,
    -- Report-level overrides (HR-set, separate from auto-detected log fixes).
    -- status_override is an exact final status string; paid_leave/lop/wfh
    -- are 0/1 flags so monthly summaries can count them without re-deriving
    -- from status alone.
    status_override TEXT,
    paid_leave INTEGER NOT NULL DEFAULT 0,
    lop INTEGER NOT NULL DEFAULT 0,
    wfh INTEGER NOT NULL DEFAULT 0,
    updated_by TEXT,
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

CREATE TABLE IF NOT EXISTS cameras (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT '',
    ip TEXT NOT NULL,
    port INTEGER NOT NULL DEFAULT 554,
    username TEXT NOT NULL DEFAULT '',
    password_encrypted TEXT NOT NULL DEFAULT '',
    rtsp_path TEXT NOT NULL DEFAULT '/Streaming/Channels/101',
    connection_status TEXT NOT NULL DEFAULT 'unknown'
        CHECK (connection_status IN ('unknown', 'connected', 'failed')),
    last_checked_at TEXT,
    last_check_message TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_snapshot_logs_timestamp ON snapshot_logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_attendance_logs_timestamp ON attendance_logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_snapshot_logs_name ON snapshot_logs (name);
CREATE INDEX IF NOT EXISTS idx_attendance_logs_name ON attendance_logs (name);
-- The source / external_event_id indexes are NOT defined inline because the
-- columns they reference are added by ALTER TABLE in init_schema below — on
-- pre-existing DBs the legacy table doesn't have them yet, so creating the
-- index here would error. They're created post-migration instead.
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
            # Multi-camera capture: tag each event with its source camera.
            # NULL on legacy rows and on captures from the env-fallback mode.
            if not _column_exists(conn, table, "camera_id"):
                conn.execute(f"ALTER TABLE {table} ADD COLUMN camera_id TEXT")
        if not _column_exists(conn, "employees", "dob"):
            conn.execute("ALTER TABLE employees ADD COLUMN dob TEXT NOT NULL DEFAULT ''")
        if not _column_exists(conn, "employees", "image_url"):
            conn.execute("ALTER TABLE employees ADD COLUMN image_url TEXT NOT NULL DEFAULT ''")
        if not _column_exists(conn, "employees", "email"):
            conn.execute("ALTER TABLE employees ADD COLUMN email TEXT NOT NULL DEFAULT ''")
        if not _column_exists(conn, "employees", "mobile"):
            conn.execute("ALTER TABLE employees ADD COLUMN mobile TEXT NOT NULL DEFAULT ''")
        if not _column_exists(conn, "employees", "salary_package"):
            conn.execute("ALTER TABLE employees ADD COLUMN salary_package TEXT NOT NULL DEFAULT ''")
        # Multi-source attendance: existing rows are local_camera by definition,
        # so the column gets a default and historical rows are tagged correctly.
        if not _column_exists(conn, "attendance_logs", "source"):
            conn.execute(
                "ALTER TABLE attendance_logs ADD COLUMN source TEXT NOT NULL DEFAULT 'local_camera'"
            )
        if not _column_exists(conn, "attendance_logs", "external_event_id"):
            conn.execute("ALTER TABLE attendance_logs ADD COLUMN external_event_id TEXT")
        if not _column_exists(conn, "attendance_logs", "event_type"):
            conn.execute("ALTER TABLE attendance_logs ADD COLUMN event_type TEXT")
        # Indexes that depend on the columns just added must run AFTER the
        # ALTER TABLEs above. ``IF NOT EXISTS`` keeps re-runs cheap.
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_attendance_logs_source "
            "ON attendance_logs (source)"
        )
        conn.execute(
            "CREATE UNIQUE INDEX IF NOT EXISTS idx_attendance_logs_external_event_id "
            "ON attendance_logs (external_event_id) "
            "WHERE external_event_id IS NOT NULL"
        )
        # Backfill new attendance_corrections columns on databases created
        # before report-level overrides existed.
        for col, ddl in (
            ("status_override", "ALTER TABLE attendance_corrections ADD COLUMN status_override TEXT"),
            ("paid_leave", "ALTER TABLE attendance_corrections ADD COLUMN paid_leave INTEGER NOT NULL DEFAULT 0"),
            ("lop", "ALTER TABLE attendance_corrections ADD COLUMN lop INTEGER NOT NULL DEFAULT 0"),
            ("wfh", "ALTER TABLE attendance_corrections ADD COLUMN wfh INTEGER NOT NULL DEFAULT 0"),
            ("updated_by", "ALTER TABLE attendance_corrections ADD COLUMN updated_by TEXT"),
        ):
            if not _column_exists(conn, "attendance_corrections", col):
                conn.execute(ddl)
