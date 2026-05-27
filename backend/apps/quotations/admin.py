"""Quotations admin."""
from django.contrib import admin
from .models import Quotation, QuotationItem


@admin.register(Quotation)
class QuotationAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'project_type', 'budget_range', 'area_sqft', 'status', 'estimated_cost_min', 'estimated_cost_max', 'created_at']
    list_filter = ['status', 'project_type']
    search_fields = ['user__email', 'requirements']
    list_editable = ['status']


@admin.register(QuotationItem)
class QuotationItemAdmin(admin.ModelAdmin):
    list_display = ['quotation', 'name', 'quantity', 'unit', 'unit_price', 'total']
    list_filter = ['quotation']