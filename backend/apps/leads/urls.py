"""Leads URLs."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SalesStageViewSet, LeadViewSet

router = DefaultRouter()
router.register(r'stages', SalesStageViewSet)
router.register(r'', LeadViewSet)

urlpatterns = [path('', include(router.urls))]