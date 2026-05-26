# BuildRanchi Pro — Architecture

## Directory Structure

```
/workspace/
├── backend/
│   ├── manage.py
│   ├── buildranchi/
│   │   ├── settings/
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── development.py
│   │   │   └── production.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── apps/
│   │   ├── __init__.py
│   │   ├── core/          # Base models, utilities, mixins
│   │   ├── accounts/      # Users, roles, JWT, OTP
│   │   ├── services/      # Service catalog
│   │   ├── projects/      # Project portfolio
│   │   ├── bookings/      # Booking & consultation
│   │   ├── quotations/    # Quote system
│   │   ├── leads/         # CRM pipeline
│   │   ├── blog/          # Blog & SEO
│   │   ├── testimonials/  # Reviews & ratings
│   │   ├── payments/      # Razorpay, invoices
│   │   ├── notifications/ # Multi-channel notifications
│   │   ├── analytics/     # Dashboard stats
│   │   └── chatbot/       # AI chatbot
│   ├── utils/             # Shared utilities
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/           # API client, endpoints
│   │   ├── assets/        # Images, fonts, icons
│   │   ├── components/    # Reusable UI components
│   │   │   ├── common/    # Button, Card, Modal, etc.
│   │   │   ├── layout/    # Header, Footer, Sidebar
│   │   │   └── sections/  # Homepage sections
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services/
│   │   │   ├── Projects/
│   │   │   ├── Booking/
│   │   │   ├── Quotation/
│   │   │   ├── Blog/
│   │   │   ├── Contact.tsx
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   └── Admin/
│   │   ├── store/         # Zustand stores
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Helpers
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── .drytis/
```

## Data Flow
1. User → React SPA → Axios → `/api/v1/` → Django URLs → Views → Serializers → Models → MySQL
2. Celery tasks via Redis broker for async operations (email, PDF generation, notifications)
3. Static files served by Caddy directly
4. Media uploads to `/workspace/backend/media/`

## API Versioning
- All endpoints under `/api/v1/`
- Version via URL prefix
- Future versions add `/api/v2/`

## Authentication Flow
1. POST `/api/v1/auth/login/` → JWT access + refresh tokens
2. POST `/api/v1/auth/register/` → User creation → OTP email
3. POST `/api/v1/auth/token/refresh/` → New access token
4. Role-based permissions on all endpoints