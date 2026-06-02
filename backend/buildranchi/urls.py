"""
URL Configuration for BuildRanchi Pro
Serves Django API + React SPA from the same domain
"""
import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse, JsonResponse
from django.views.decorators.cache import cache_control
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


# ============================================================
# Health check endpoint (for Render)
# ============================================================
def health_check(request):
    return JsonResponse({'status': 'healthy', 'service': 'BuildRanchi Pro'})


# ============================================================
# Serve React SPA index.html
# WhiteNoise handles /static/frontend/assets/* automatically
# ============================================================
@cache_control(max_age=300)
def serve_react_app(request):
    """Serve the React SPA index.html for all frontend routes."""
    index_path = os.path.join(settings.STATIC_ROOT, 'frontend', 'index.html')

    # Fallback: try reading from frontend_dist if staticfiles not collected yet
    if not os.path.exists(index_path):
        index_path = os.path.join(settings.BASE_DIR, 'frontend_dist', 'index.html')

    if os.path.exists(index_path):
        with open(index_path, 'r') as f:
            html = f.read()
        # Rewrite asset paths: /assets/ → /static/frontend/assets/
        html = html.replace('="/assets/', '="/static/frontend/assets/')
        html = html.replace('="/favicon.svg"', '="/static/frontend/favicon.svg"')
        return HttpResponse(html, content_type='text/html')

    # If no frontend build exists, return a simple API-only message
    return HttpResponse(
        '<h1>BuildRanchi Pro API</h1><p>Frontend not built. API is running.</p>'
        f'<p><a href="/api/docs/">API Documentation</a></p>'
        f'<p><a href="/admin/">Admin Panel</a></p>',
        content_type='text/html',
    )


# ============================================================
# API Routes (these must match BEFORE the SPA catch-all)
# ============================================================
api_urlpatterns = [
    path('health/', health_check, name='health_check'),
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('apps.accounts.urls')),
    path('api/v1/services/', include('apps.services.urls')),
    path('api/v1/projects/', include('apps.projects.urls')),
    path('api/v1/bookings/', include('apps.bookings.urls')),
    path('api/v1/quotations/', include('apps.quotations.urls')),
    path('api/v1/leads/', include('apps.leads.urls')),
    path('api/v1/blog/', include('apps.blog.urls')),
    path('api/v1/testimonials/', include('apps.testimonials.urls')),
    path('api/v1/payments/', include('apps.payments.urls')),
    path('api/v1/notifications/', include('apps.notifications.urls')),
    path('api/v1/analytics/', include('apps.analytics.urls')),
    path('api/v1/chatbot/', include('apps.chatbot.urls')),
    path('api/v1/careers/', include('apps.careers.urls')),
    path('api/v1/core/', include('apps.core.urls')),
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

# ============================================================
# Main URL patterns
# API routes first, then SPA catch-all for React Router
# ============================================================
urlpatterns = api_urlpatterns + [
    # React SPA catch-all: serves index.html for ALL non-API routes
    # React Router handles client-side routing (/, /about, /services, etc.)
    re_path(r'^(?!api/|admin/|media/|health/|static/).*$', serve_react_app, name='app'),
]

# Media files in development
if settings.DEBUG:
    urlpatterns = api_urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
        re_path(r'^(?!api/|admin/|media/|health/|static/).*$', serve_react_app, name='app'),
    ]