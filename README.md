# CelebConnect — Backend Starter

## What is included
- Minimal Express server
- Example routes: auth, celebrities, events, bookings
- Postgres SQL schema (migrations/init.sql)
- Dockerfile and docker-compose.yml for local dev

## Quick start (with Docker)
1. Copy `.env.example` to `.env` and fill values if desired.
2. Build and run:
   ```bash
   docker-compose up --build
   ```
3. Backend will be available at `http://localhost:4000` and Postgres at `localhost:5432`.

## Notes
- This is a starter template. You should run migrations (see migrations/init.sql) after DB is ready.
