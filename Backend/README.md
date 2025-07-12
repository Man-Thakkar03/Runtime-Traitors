# Runtime Traitors Backend

A robust, production-ready FastAPI backend for the Runtime Traitors application, featuring JWT authentication, role-based access control, file uploads to Azure Blob Storage, and a modular, scalable architecture.

---

## Features

- **FastAPI**: High-performance, modern Python web framework
- **MongoDB**: Flexible NoSQL database with async support via Motor/Beanie
- **JWT Authentication**: Secure login, registration, and role-based access
- **Admin Panel**: Admin-only endpoints for user management
- **File Uploads**: Secure uploads to Azure Blob Storage with validation
- **Consistent API**: Standardized response format for all endpoints
- **Health Checks**: Endpoints for system, database, and storage health
- **Testing & Quality**: Pytest, Black, Flake8, MyPy, and pre-commit hooks
- **Dockerized**: Ready for containerized deployment

---

## Project Structure

```
.
├── app/
│   ├── api/           # API endpoints (v1, auth, users, uploads, admin, health)
│   ├── core/          # Config, security, logging, exceptions, utils
│   ├── crud/          # Database CRUD operations
│   ├── db/            # Database session, migrations, indexes
│   ├── models/        # Database models and enums
│   ├── schemas/       # Pydantic schemas for validation
│   ├── services/      # Business logic and integrations
│   ├── utils/         # Validators and formatters
│   └── main.py        # FastAPI app entrypoint
├── scripts/           # Utility scripts (db init, admin, backup, restore, etc.)
├── docs/              # API plan and reference
├── requirements.txt   # Main dependencies
├── requirements-dev.txt # Dev dependencies
├── Dockerfile         # Docker build
└── ...
```

---

## Quick Start

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd runtime-traitors-backend
```

### 2. Install Dependencies

```sh
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
```

### 3. Configure Environment

Create a `.env` file in the project root with the following variables (see `app/core/config.py` for all options):

```env
APP_NAME=Runtime Traitors Backend
APP_VERSION=1.0.0
DEBUG=True
ENVIRONMENT=development

SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=runtime_traitors

AZURE_STORAGE_ACCOUNT_NAME=your-azure-account
AZURE_STORAGE_ACCOUNT_KEY=your-azure-key
AZURE_STORAGE_CONTAINER=uploads

MAX_UPLOAD_SIZE=52428800
```

### 4. Initialize the Database

```sh
python scripts/init_db.py
python scripts/init_indexes.py
python scripts/migrate.py
python scripts/seed_db.py
```

### 5. Run the Application

```sh
python run.py
```

The API will be available at [http://localhost:8000](http://localhost:8000).

---

## Docker Usage

### Build and Run

```sh
docker build -t runtime-traitors-backend .
docker run -p 8000:8000 --env-file .env runtime-traitors-backend
```

---

## API Overview

- **Base URL:** `http://localhost:8000/api/v1`
- **Authentication:** JWT Bearer tokens (`Authorization: Bearer <token>`)
- **Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

### Example Endpoints

- `POST /auth/login` — User login
- `POST /auth/register` — User registration
- `POST /auth/logout` — Logout (token blacklisting)
- `GET /users/me` — Get current user profile
- `PUT /users/me` — Update current user profile
- `DELETE /users/me` — Delete current user
- `POST /uploads/` — Upload a file
- `GET /health` — Health check

See `docs/api-reference.md` for full details.

---

## Utility Scripts

- `python scripts/init_db.py` — Initialize the database and create default admin
- `python scripts/create_admin.py <email> <password>` — Create a new admin user
- `python scripts/backup_db.py` — Backup the MongoDB database
- `python scripts/restore_db.py` — Restore the database from a backup
- `python scripts/migrate.py` — Run database migrations
- `python scripts/seed_db.py` — Seed the database with test data
- `python scripts/init_indexes.py` — Initialize database indexes

---

## Development & Testing

- **Run tests:**  
  ```sh
  pytest
  ```
- **Lint & format:**  
  ```sh
  black .
  flake8 .
  mypy .
  ```

---

## Environment Variables

See `app/core/config.py` for all available settings.

---

## License

MIT License 