# ============================================================
# BuildRanchi Pro — Single Dockerfile for Render Free Tier
# Multi-stage: Node.js builds React → Python serves Django + SPA
# ============================================================

# ─── STAGE 1: Build React Frontend ────────────────────────
FROM node:24-alpine AS frontend-builder

WORKDIR /build

# Install dependencies first (cached layer)
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --prefer-offline

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build
# Output: /build/dist/

# ─── STAGE 2: Python + Django Backend ─────────────────────
FROM python:3.13-slim

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=buildranchi.settings \
    PORT=8000

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    default-libmysqlclient-dev \
    pkg-config \
    gcc \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project
COPY backend/ .

# Copy built React frontend into Django's template/static directories
COPY --from=frontend-builder /build/dist /app/frontend_dist

# Copy entrypoint script
COPY render_entrypoint.sh /app/render_entrypoint.sh
RUN chmod +x /app/render_entrypoint.sh

# Expose the port Render provides (defaults to 8000)
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:${PORT:-8000}/health/ || exit 1

# Entrypoint: migrate, collectstatic, start gunicorn
ENTRYPOINT ["/app/render_entrypoint.sh"]