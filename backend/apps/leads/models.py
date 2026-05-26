"""
Leads app — CRM pipeline, lead management, scoring
"""
from django.db import models
from apps.core.models import TimeStampedModel


class SalesStage(TimeStampedModel):
    """Sales pipeline stages."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    sort_order = models.PositiveIntegerField(default=0)
    color = models.CharField(max_length=7, default='#3B82F6', help_text='Hex color code')

    class Meta:
        ordering = ['sort_order']

    def __str__(self):
        return self.name


class Lead(TimeStampedModel):
    """CRM lead from various sources."""
    SOURCE_CHOICES = [
        ('website', 'Website'),
        ('whatsapp', 'WhatsApp'),
        ('referral', 'Referral'),
        ('ads', 'Google/Facebook Ads'),
        ('direct', 'Direct Call'),
        ('social', 'Social Media'),
        ('other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('qualified', 'Qualified'),
        ('proposal', 'Proposal Sent'),
        ('negotiation', 'Negotiation'),
        ('won', 'Won'),
        ('lost', 'Lost'),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, default='website')
    service_interest = models.CharField(max_length=200, blank=True)
    budget_range = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=200, blank=True, default='Ranchi')
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    stage = models.ForeignKey(SalesStage, on_delete=models.SET_NULL, null=True, blank=True)
    assigned_to = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_leads')
    score = models.PositiveIntegerField(default=0, help_text='AI lead score 0-100')
    notes = models.TextField(blank=True)
    next_follow_up = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.get_status_display()}"


class LeadNote(TimeStampedModel):
    """Notes added to a lead by staff/admin."""
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='lead_notes')
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    note = models.TextField()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Note on {self.lead.name} by {self.user.get_full_name()}"


class LeadFollowUp(TimeStampedModel):
    """Scheduled follow-up for a lead."""
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='follow_ups')
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    follow_up_date = models.DateTimeField()
    type = models.CharField(max_length=50, choices=[
        ('call', 'Phone Call'),
        ('email', 'Email'),
        ('whatsapp', 'WhatsApp'),
        ('visit', 'Site Visit'),
        ('meeting', 'Meeting'),
    ], default='call')
    notes = models.TextField(blank=True)
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['follow_up_date']

    def __str__(self):
        return f"Follow-up: {self.lead.name} on {self.follow_up_date}"