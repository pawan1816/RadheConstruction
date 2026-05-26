"""
Core app — shared models: ContactQuery, FAQ, TeamMember, CompanyInfo
"""
from django.db import models


class TimeStampedModel(models.Model):
    """Abstract base model with created_at and updated_at."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ContactQuery(TimeStampedModel):
    """Contact form submissions from website visitors."""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=300, blank=True)
    message = models.TextField()
    source_page = models.CharField(max_length=200, blank=True)
    is_resolved = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Contact queries'

    def __str__(self):
        return f"{self.name} — {self.subject or 'No Subject'}"


class FAQ(TimeStampedModel):
    """Frequently Asked Questions."""
    CATEGORY_CHOICES = [
        ('general', 'General'),
        ('pricing', 'Pricing'),
        ('services', 'Services'),
        ('booking', 'Booking'),
        ('payment', 'Payment'),
        ('construction', 'Construction'),
    ]
    question = models.CharField(max_length=500)
    answer = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='general')
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', 'category']
        verbose_name = 'FAQ'

    def __str__(self):
        return self.question[:80]


class TeamMember(TimeStampedModel):
    """Company team members displayed on the About page."""
    name = models.CharField(max_length=200)
    designation = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='team/', blank=True, null=True)
    bio = models.TextField(blank=True)
    experience = models.PositiveIntegerField(help_text='Years of experience', default=0)
    specializations = models.JSONField(default=list, blank=True)
    social_links = models.JSONField(default=dict, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order']

    def __str__(self):
        return f"{self.name} — {self.designation}"


class CompanyInfo(TimeStampedModel):
    """Singleton model for company information."""
    name = models.CharField(max_length=200, default='BuildRanchi Pro')
    tagline = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to='company/', blank=True, null=True)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    whatsapp_number = models.CharField(max_length=20, blank=True)
    social_links = models.JSONField(default=dict, blank=True)
    stats = models.JSONField(default=dict, blank=True, help_text='{"projects_completed": 500, "happy_clients": 450, ...}')

    class Meta:
        verbose_name_plural = 'Company info'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Enforce singleton
        if CompanyInfo.objects.exists() and not self.pk:
            self.pk = CompanyInfo.objects.first().pk
        super().save(*args, **kwargs)


class SiteSetting(TimeStampedModel):
    """Key-value site settings for dynamic configuration."""
    key = models.CharField(max_length=100, unique=True)
    value = models.TextField(blank=True)
    description = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.key