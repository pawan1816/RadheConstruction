"""Core admin."""
from django.contrib import admin
from .models import ContactQuery, FAQ, TeamMember, CompanyInfo, SiteSetting


@admin.register(ContactQuery)
class ContactQueryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_resolved', 'created_at']
    list_filter = ['is_resolved', 'created_at']
    search_fields = ['name', 'email', 'subject']
    list_editable = ['is_resolved']


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'category', 'sort_order', 'is_active']
    list_filter = ['category', 'is_active']
    list_editable = ['sort_order', 'is_active']


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'designation', 'sort_order', 'is_active']
    list_editable = ['sort_order', 'is_active']


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email']


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ['key', 'description']