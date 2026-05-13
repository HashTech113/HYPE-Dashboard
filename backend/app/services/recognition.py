"""Cosine-similarity matcher backed by the in-memory embedding cache.

Per-frame work: ``matrix @ q`` (one BLAS matmul, ~50 µs at 1k vectors)
+ argmax + per-employee dedup. The matrix and id list are read once
under the cache's lock so concurrent training writes never split a
similarity score from its employee_id.
"""

from __future__ import annotations

import threading
import time
from dataclasses import dataclass
from typing import Optional

import numpy as np

from ..config import FACE_MATCH_THRESHOLD
from .embedding_cache import get_embedding_cache


@dataclass(frozen=True)
class MatchResult:
    employee_id: Optional[str]
    score: float
    second_best_score: float


class RecognitionService:
    def __init__(self) -> None:
        self._cache = get_embedding_cache()

    def match(
        self,
        embedding: np.ndarray,
        *,
        threshold: Optional[float] = None,
    ) -> MatchResult:
        thr = float(threshold) if threshold is not None else FACE_MATCH_THRESHOLD
        matrix, ids, _ = self._cache.snapshot()
        if matrix is None or matrix.size == 0:
            return MatchResult(None, 0.0, 0.0)

        q = embedding.astype(np.float32)
        n = float(np.linalg.norm(q))
        if n == 0:
            return MatchResult(None, 0.0, 0.0)
        q = q / n

        sims = matrix @ q

        # Aggregate per-employee: an employee with multiple enrolled
        # photos shouldn't have all of them clog the top of the ranking.
        # Take the max similarity per employee and rank that.
        per_employee: dict[str, float] = {}
        for emp_id, s in zip(ids, sims, strict=False):
            v = float(s)
            if emp_id not in per_employee or per_employee[emp_id] < v:
                per_employee[emp_id] = v

        ranked = sorted(per_employee.items(), key=lambda x: x[1], reverse=True)
        if not ranked:
            return MatchResult(None, 0.0, 0.0)
        best_id, best_score = ranked[0]
        second = ranked[1][1] if len(ranked) > 1 else 0.0

        if best_score < thr:
            return MatchResult(None, best_score, second)
        return MatchResult(best_id, best_score, second)


_singleton_lock = threading.Lock()
_singleton: Optional[RecognitionService] = None


def get_recognition_service() -> RecognitionService:
    global _singleton
    with _singleton_lock:
        if _singleton is None:
            _singleton = RecognitionService()
        return _singleton


# ---- per-employee cooldown -------------------------------------------------

class _Cooldown:
    """Suppresses duplicate recognition events for the same employee
    within ``window_seconds`` so a face lingering in front of a camera
    doesn't fire dozens of attendance rows in a few seconds.

    Lives at module scope (not a singleton class) so all callers in the
    same process share state — different camera workers MUST share this
    state, otherwise two cameras seeing the same person at the same
    moment would still write two rows."""

    def __init__(self, window_seconds: float = 5.0) -> None:
        self._window = float(window_seconds)
        self._last: dict[str, float] = {}
        self._lock = threading.Lock()

    def hit(self, employee_id: str, *, now: Optional[float] = None) -> bool:
        """Returns True if the event should be allowed through (no
        recent record), False if it's within the cooldown window. Side
        effect: stamps the timestamp on a successful hit."""
        ts = now if now is not None else time.monotonic()
        with self._lock:
            last = self._last.get(employee_id, 0.0)
            if ts - last < self._window:
                return False
            self._last[employee_id] = ts
            return True

    def reset(self, employee_id: Optional[str] = None) -> None:
        with self._lock:
            if employee_id is None:
                self._last.clear()
            else:
                self._last.pop(employee_id, None)


_cooldown_singleton: Optional[_Cooldown] = None


def get_cooldown(window_seconds: float = 5.0) -> _Cooldown:
    global _cooldown_singleton
    if _cooldown_singleton is None:
        _cooldown_singleton = _Cooldown(window_seconds=window_seconds)
    return _cooldown_singleton
