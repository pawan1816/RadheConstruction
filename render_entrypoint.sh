#!/bin/bash
# ============================================================
# BuildRanchi Pro — Render Entrypoint Script
# Runs migrations, collects static files, starts Gunicorn
# ============================================================

set -e

echo "=== BuildRanchi Pro — Starting Deployment ==="

# --- Step 1: Copy React build into Django static directory ---
echo ">>> Setting up React frontend..."

# Create the target directory
mkdir -p /app/staticfiles/frontend

# Copy the entire frontend dist into staticfiles/frontend/
# This way /static/frontend/index.html and /static/frontend/assets/* are all served by WhiteNoise
if [ -d "/app/frontend_dist" ]; then
    cp -r /app/frontend_dist/* /app/staticfiles/frontend/
    echo "Copied React build to staticfiles/frontend/"
else
    echo "WARNING: /app/frontend_dist not found — React build may be missing"
fi

# --- Step 2: Run database migrations ---
echo ">>> Running database migrations..."
python manage.py migrate --noinput 2>&1 || echo "WARNING: Migration failed (DB may not be ready yet)"

# --- Step 3: Collect static files (Django admin + frontend) ---
echo ">>> Collecting static files..."
python manage.py collectstatic --noinput 2>&1 || echo "WARNING: collectstatic had issues"

# --- Step 4: Create superuser if env vars are set (first run only) ---
if [ -n "$DJANGO_SUPERUSER_EMAIL" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
    echo ">>> Creating superuser (if not exists)..."
    python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
email = '$DJANGO_SUPERUSER_EMAIL'
if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(
        email=email,
        name='Admin',
        password='$DJANGO_SUPERUSER_PASSWORD'
    )
    print(f'Created superuser: {email}')
else:
    print(f'Superuser already exists: {email}')
" 2>&1 || echo "WARNING: Superuser creation skipped"
fi

# --- Step 5: Start Gunicorn ---
echo ">>> Starting Gunicorn on port ${PORT:-8000}..."
exec gunicorn buildranchi.wsgi:application \
    --bind 0.0.0.0:${PORT:-8000} \
    --workers 3 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -