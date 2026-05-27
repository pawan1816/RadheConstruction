"""Services admin."""
from django.contrib import admin
from .models import ServiceCategory, Service, ServiceFAQ


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'icon', 'sort_order', 'is_active']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['sort_order', 'is_active']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'category', 'price_range_min', 'price_range_max', 'is_featured', 'is_active']
    list_filter = ['category', 'is_featured', 'is_active']
    search_fields = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_featured', 'is_active']


@admin.register(ServiceFAQ)
class ServiceFAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'service', 'sort_order']
    list_filter = ['service']