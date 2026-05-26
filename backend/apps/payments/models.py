"""
Payments app — Razorpay integration, invoices, GST
"""
from django.db import models
from apps.core.models import TimeStampedModel


class Payment(TimeStampedModel):
    """Payment records with Razorpay integration."""
    PAYMENT_METHOD_CHOICES = [
        ('razorpay', 'Razorpay'),
        ('upi', 'UPI'),
        ('bank_transfer', 'Bank Transfer'),
        ('cash', 'Cash'),
        ('cheque', 'Cheque'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='payments')
    booking = models.ForeignKey('bookings.Booking', on_delete=models.SET_NULL, null=True, blank=True, related_name='payments')
    quotation = models.ForeignKey('quotations.Quotation', on_delete=models.SET_NULL, null=True, blank=True, related_name='payments')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=3, default='INR')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='razorpay')
    transaction_id = models.CharField(max_length=200, blank=True)
    razorpay_order_id = models.CharField(max_length=200, blank=True)
    razorpay_payment_id = models.CharField(max_length=200, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    invoice_number = models.CharField(max_length=50, blank=True, unique=True)
    invoice_pdf = models.FileField(upload_to='invoices/', blank=True, null=True)
    gst_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    gst_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=18.00)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Payment #{self.id} — ₹{self.amount} ({self.get_status_display()})"