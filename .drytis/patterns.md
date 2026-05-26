# BuildRanchi Pro — Patterns

## Coding Standards
- **Python**: PEP 8, type hints, docstrings
- **TypeScript**: Strict mode, interfaces over types for objects
- **Naming**: snake_case (Python), camelCase (TypeScript), PascalCase (components)

## Backend Patterns
- Each Django app: models.py, serializers.py, views.py, urls.py, admin.py
- Use DRF ViewSets with Router for CRUD
- Custom permissions per role
- Select/prefetch related for query optimization
- Service layer for complex business logic
- Standardize API responses: `{success, data, message, errors}`

## Frontend Patterns
- Functional components with hooks
- Zustand for global state
- TanStack Query for server state + caching
- Axios interceptors for auth tokens
- Route-based code splitting with React.lazy
- Shared UI components in components/common/

## Error Handling
- Backend: DRF exception handler → standardized JSON errors
- Frontend: Toast notifications for errors, error boundaries

## Test Conventions
- Backend: pytest + pytest-django
- Frontend: Vitest + React Testing Library
- API tests for all endpoints
- Component tests for critical UI

## Naming Conventions
- API endpoints: plural nouns, kebab-case (`/api/v1/blog-posts/`)
- DB tables: app_modelname (`accounts_user`)
- React components: PascalCase files (`BookingCard.tsx`)
- CSS: Tailwind utility classes, custom in `theme/`