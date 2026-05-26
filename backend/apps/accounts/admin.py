"""Accounts admin."""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, EngineerProfile


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ['email', 'username', 'first_name', 'last_name', 'role', 'is_active']
    list_filter = ['role', 'is_active']
    search_fields = ['email', 'first_name', 'last_name', 'phone']
    fieldsets = UserAdmin.fieldsets + (
        ('Profile', {'fields': ('phone', 'role', 'avatar', 'address', 'city', 'state', 'pincode', 'is_verified', 'company_name', 'gst_number')}),
    )


@admin.register(EngineerProfile)
class EngineerProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'specialization', 'experience_years', 'rating', 'availability']
    list_filter = ['availability']