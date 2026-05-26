"""
Quotations app — Multi-step quotation system with PDF generation
"""
from django.db import models
from apps.core.models import TimeStampedModel


class Quotation(TimeStampedModel):
    """Quotation request from customer."""
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('reviewed', 'Reviewed'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('converted', 'Converted to Project'),
    ]

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='quotations')
    service = models.ForeignKey('services.Service', on_delete=models.SET_NULL, null=True, blank=True)
    project_type = models.CharField(max_length=200, blank=True)
    budget_range = models.CharField(max_length=100, blank=True)
    area_sqft = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    floors = models.PositiveIntegerField(default=1)
    rooms = models.PositiveIntegerField(default=0)
    requirements = models.TextField(blank=True)
    documents = models.JSONField(default=list, blank=True, help_text='Uploaded document paths')
    images = models.JSONField(default=list, blank=True, help_text='Uploaded image paths')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    estimated_cost_min = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    estimated_cost_max = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    admin_notes = models.TextField(blank=True)
    pdf_file = models.FileField(upload_to='quotations/', blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Quote #{self.id} — {self.user.get_full_name()}"


class QuotationItem(TimeStampedModel):
    """Individual line items in a quotation."""
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    unit = models.CharField(max_length=50, default='sq.ft.')
    unit_price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f"{self.name} — ₹{self.total}"