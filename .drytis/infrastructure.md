# BuildRanchi Pro — Infrastructure

## Proxy Routes
1. `/api/` → Django backend (port 8000)
2. `/admin/` → Django admin (port 8000)  
3. `/media/` → Django media files (port 8000)
4. `/` → React frontend (Vite dev server on port 3000)

## Background Services
1. `django-api` — Gunicorn serving Django on port 8000
2. `celery-worker` — Celery worker for async tasks
3. `celery-beat` — Celery beat scheduler

## Environment Variables
- Django settings: SECRET_KEY, DEBUG, ALLOWED_HOSTS
- Database: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
- Redis: REDIS_URL
- Email: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD
- Razorpay: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
- WhatsApp: WHATSAPP_API_KEY, WHATSAPP_PHONE_NUMBER
- JWT: JWT_ACCESS_LIFETIME, JWT_REFRESH_LIFETIME

## Ports
- 3000: React dev server (development) / static SPA (production)
- 8000: Django/Gunicorn
- 6379: Redis