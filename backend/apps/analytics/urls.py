"""Analytics URLs."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnalyticsEventViewSet, DailyStatViewSet, dashboard_stats

router = DefaultRouter()
router.register(r'events', AnalyticsEventViewSet)
router.register(r'daily', DailyStatViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', dashboard_stats, name='dashboard-stats'),
]