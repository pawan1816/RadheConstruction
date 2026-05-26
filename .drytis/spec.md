# BuildRanchi Pro — Specification

## Overview
Enterprise-grade construction + real estate + booking platform for Ranchi, Jharkhand, India.

## Tech Stack
- **Backend**: Django 5+ / DRF / MySQL / Redis / Celery
- **Frontend**: React 19 + Vite / Tailwind CSS / Framer Motion / Zustand / TanStack Query
- **Auth**: JWT (simplejwt)
- **Deployment**: Caddy reverse proxy → Vite dev / Gunicorn prod

## Architecture
- Backend: `/workspace/backend/` — Django project with 13 modular apps
- Frontend: `/workspace/frontend/` — React SPA
- API: Versioned REST at `/api/v1/`
- Caddy: Reverse proxy to frontend + API

## Key Decisions
- MySQL is auto-provisioned (not PostgreSQL) — use as primary DB
- Redis/Celery available but optional for initial deploy
- Production-optimized background services only
- All env vars through backend env_keys tool