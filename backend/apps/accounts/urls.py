"""Accounts URLs."""
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import register_view, login_view, profile_view, change_password_view, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('profile/', profile_view, name='profile'),
    path('change-password/', change_password_view, name='change-password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('', include(router.urls)),
]