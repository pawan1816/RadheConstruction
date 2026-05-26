"""Core URLs."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FAQViewSet, TeamMemberViewSet, CompanyInfoViewSet, SiteSettingViewSet, contact_submit

router = DefaultRouter()
router.register(r'faqs', FAQViewSet)
router.register(r'team', TeamMemberViewSet)
router.register(r'company', CompanyInfoViewSet, basename='company')
router.register(r'settings', SiteSettingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', contact_submit, name='contact-submit'),
]