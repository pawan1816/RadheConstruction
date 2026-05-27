"""Payments admin."""
from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'amount', 'currency', 'payment_method', 'status', 'invoice_number', 'created_at']
    list_filter = ['status', 'payment_method']
    search_fields = ['invoice_number', 'transaction_id', 'user__email']
    list_editable = ['status']