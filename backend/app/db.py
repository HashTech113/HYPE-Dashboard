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
    image_path TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS attendance_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    image_path TEXT NOT NULL UNIQUE
);

CREATE INDEX IF NOT EXISTS idx_snapshot_logs_timestamp ON snapshot_logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_attendance_logs_timestamp ON attendance_logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_snapshot_logs_name ON snapshot_logs (name);
CREATE INDEX IF NOT EXISTS idx_attendance_logs_name ON attendance_logs (name);
"""


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(str(DB_PATH), isolation_level=None, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode = WAL")
    conn.execute("PRAGMA synchronous = NORMAL")
    return conn


@contextmanager
def connect() -> Iterator[sqlite3.Connection]:
    conn = get_connection()
    try:
        yield conn
    finally:
        conn.close()


def init_schema() -> None:
    with connect() as conn:
        conn.executescript(SCHEMA)
