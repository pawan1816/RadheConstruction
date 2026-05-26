"""
URL Configuration for BuildRanchi Pro
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
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
    path('api/v1/core/', include('apps.core.urls')),
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)