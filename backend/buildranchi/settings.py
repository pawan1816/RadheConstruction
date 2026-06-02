"""
Django settings for BuildRanchi Pro — Enterprise Construction Platform
Production-ready configuration for Render deployment
"""
import os
from pathlib import Path
from datetime import timedelta

# Build paths
BASE_DIR = Path(__file__).resolve().parent.parent

# ============================================================
# Environment Variables
# ============================================================
# Load .env only if it exists (local dev). Render uses env vars directly.
_env_path = BASE_DIR / '.env'
if _env_path.exists():
    from dotenv import load_dotenv
    load_dotenv(_env_path)

# ============================================================
# SECURITY
# ============================================================
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-change-me-in-production')
DEBUG = os.getenv('DEBUG', 'False').lower() in ('true', '1', 'yes')

# ALLOWED_HOSTS — Render provides the URL via RENDER_EXTERNAL_URL
RENDER_EXTERNAL_URL = os.getenv('RENDER_EXTERNAL_URL', '')
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '*').split(',')
if RENDER_EXTERNAL_URL:
    from urllib.parse import urlparse
    parsed = urlparse(RENDER_EXTERNAL_URL)
    if parsed.hostname:
        ALLOWED_HOSTS.append(parsed.hostname)
        ALLOWED_HOSTS.append(f'.{parsed.hostname}')  # wildcard subdomain

# Ensure 'localhost' and '127.0.0.1' are always present
for h in ['localhost', '127.0.0.1', '.onrender.com', '.drytis.dev']:
    if h not in ALLOWED_HOSTS:
        ALLOWED_HOSTS.append(h)

# ============================================================
# Application definition
# ============================================================
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_filters',
    'drf_spectacular',
    'django_celery_beat',
]

LOCAL_APPS = [
    'apps.core',
    'apps.accounts',
    'apps.services',
    'apps.projects',
    'apps.bookings',
    'apps.quotations',
    'apps.leads',
    'apps.blog',
    'apps.testimonials',
    'apps.payments',
    'apps.notifications',
    'apps.analytics',
    'apps.chatbot',
    'apps.careers',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'buildranchi.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates',  # React SPA index.html
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'buildranchi.wsgi.application'

# ============================================================
# Database — Render PostgreSQL (primary) or MySQL (local)
# ============================================================
DATABASE_URL = os.getenv('DATABASE_URL', '')
if DATABASE_URL:
    # Render provides DATABASE_URL for PostgreSQL
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    # Fallback to MySQL or SQLite for local dev
    DATABASES = {
        'default': {
            'ENGINE': os.getenv('DB_ENGINE', 'django.db.backends.sqlite3'),
            'NAME': os.getenv('DB_NAME', BASE_DIR / 'db.sqlite3'),
            'USER': os.getenv('DB_USER', ''),
            'PASSWORD': os.getenv('DB_PASSWORD', ''),
            'HOST': os.getenv('DB_HOST', ''),
            'PORT': os.getenv('DB_PORT', ''),
        }
    }

# ============================================================
# Password validation
# ============================================================
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ============================================================
# Internationalization
# ============================================================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# ============================================================
# Static files & WhiteNoise
# ============================================================
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Additional directories WhiteNoise should serve
STATICFILES_DIRS = [
    BASE_DIR / 'frontend_dist',
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ============================================================
# Media files
# ============================================================
MEDIA_URL = os.getenv('MEDIA_URL', '/media/')
MEDIA_ROOT = BASE_DIR / 'media'

# ============================================================
# Default primary key
# ============================================================
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ============================================================
# Custom User Model
# ============================================================
AUTH_USER_MODEL = 'accounts.User'

# ============================================================
# REST Framework
# ============================================================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ),
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
    },
}

# ============================================================
# JWT Settings
# ============================================================
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=int(os.getenv('JWT_ACCESS_LIFETIME', '60'))),
    'REFRESH_TOKEN_LIFETIME': timedelta(minutes=int(os.getenv('JWT_REFRESH_LIFETIME', '1440'))),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# ============================================================
# CORS Settings
# ============================================================
# In production, CORS should allow the Render URL
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')
if RENDER_EXTERNAL_URL:
    CORS_ALLOWED_ORIGINS.append(RENDER_EXTERNAL_URL.rstrip('/'))
# Always allow localhost for dev
for h in ['http://localhost:3000', 'http://localhost:8000', 'http://127.0.0.1:3000', 'http://127.0.0.1:8000']:
    if h not in CORS_ALLOWED_ORIGINS:
        CORS_ALLOWED_ORIGINS.append(h)

CORS_ALLOW_CREDENTIALS = True

# CSRF Trusted Origins
CSRF_TRUSTED_ORIGINS = [origin for origin in CORS_ALLOWED_ORIGINS if origin.startswith('http')]

# If running behind Render's proxy, trust it
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# ============================================================
# Security Settings (production only)
# ============================================================
if not DEBUG:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = False  # Render handles SSL at the proxy level
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'

# ============================================================
# Celery Settings (optional on Render Free — skip if no Redis)
# ============================================================
CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE
CELERY_ENABLE_UTC = True

# ============================================================
# Drf-Spectacular (Swagger/OpenAPI)
# ============================================================
SPECTACULAR_SETTINGS = {
    'TITLE': 'BuildRanchi Pro API',
    'DESCRIPTION': 'Enterprise Construction Platform API for Ranchi, Jharkhand',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

# ============================================================
# Site Settings
# ============================================================
SITE_NAME = 'BuildRanchi Pro'
SITE_URL = os.getenv('SITE_URL', RENDER_EXTERNAL_URL or 'http://localhost:8000')
COMPANY_PHONE = '+91 7258021382'
COMPANY_PHONE_2 = '+91 6203277096'
COMPANY_WHATSAPP = '916203277096'
COMPANY_EMAIL = 'paikpawan18@gmail.com'
COMPANY_ADDRESS = 'Dhurva, Ranchi, Jharkhand, India'
COMPANY_LAT = 23.3441
COMPANY_LNG = 85.3096

# ============================================================
# File Upload Settings
# ============================================================
FILE_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024  # 10MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024
MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']