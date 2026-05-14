# Attendance Dashboard (Main Project)

This is the main project in this repo:

- `backend/` = FastAPI API + capture workers + SQLite/PostgreSQL storage
- `frontend/` = Vite + React dashboard (runs on port `8080`)

If you copied this folder to another PC (Windows/Ubuntu), follow the steps below.

## 1) Requirements

- Python `3.11+` (3.12 works)
- Node.js `22+`
- npm

## 2) One-time setup (Windows)

Run these in **PowerShell** from project root:

```powershell
# backend deps
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
deactivate
cd ..

# frontend deps
cd frontend
npm install
cd ..

# root helper deps (for npm run dev)
npm install
```

## 3) One-time setup (Ubuntu)

Run these in terminal from project root:

```bash
# backend deps
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
deactivate
cd ..

# frontend deps
cd frontend
npm install
cd ..

# root helper deps (for npm run dev)
npm install
```

## 4) Run locally (recommended)

### Windows

Use **Git Bash** or **WSL** (because the backend launcher is `bash backend/start.sh`):

```bash
npm run dev
```

### Ubuntu

```bash
npm run dev
```

This starts:

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:8080`

## 5) Alternative: run backend/frontend separately

If you do not want the combined command:

### Backend

Windows PowerShell:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Ubuntu:

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

Windows or Ubuntu:

```bash
cd frontend
npm run dev
```

## 6) Health checks

- Backend health: `http://localhost:8000/api/health`
- Frontend: `http://localhost:8080`

If frontend opens but shows API errors, confirm backend is running first.

## 7) Data when moving to another PC

- Main local DB file is usually `backend/database.db` (SQLite fallback).
- If you want old employees/snapshots, copy this DB file too.
- No migration is needed when staying on SQLite + same codebase.
- Migration is needed only when moving to PostgreSQL (see `backend/scripts/migrate_sqlite_to_postgres.py`).

## 8) Detailed docs

- Backend docs: [backend/README.md](backend/README.md)
- Frontend docs: [frontend/README.md](frontend/README.md)
