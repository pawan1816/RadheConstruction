"""
Services app — Service catalog, categories, process steps, FAQs
"""
from django.db import models
from apps.core.models import TimeStampedModel


class ServiceCategory(TimeStampedModel):
    """Service categories (Residential, Commercial, Interior, etc.)"""
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=100, blank=True, help_text='Icon class name')
    description = models.TextField(blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order']
        verbose_name_plural = 'Service categories'

    def __str__(self):
        return self.name


class Service(TimeStampedModel):
    """Individual service offering."""
    category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='services')
    name = models.CharField(max_length=300)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=500, blank=True)
    description = models.TextField(blank=True)
    features = models.JSONField(default=list, blank=True, help_text='List of features')
    price_range_min = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    price_range_max = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    price_unit = models.CharField(max_length=50, blank=True, default='per sq.ft.')
    hero_image = models.ImageField(upload_to='services/', blank=True, null=True)
    gallery = models.JSONField(default=list, blank=True, help_text='List of image URLs')
    process_steps = models.JSONField(default=list, blank=True, help_text='[{"title": "...", "description": "..."}]')
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    # SEO
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.CharField(max_length=500, blank=True)
    meta_keywords = models.CharField(max_length=500, blank=True)

    class Meta:
        ordering = ['sort_order']

    def __str__(self):
        return self.name


class ServiceFAQ(TimeStampedModel):
    """FAQs specific to a service."""
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='faqs')
    question = models.CharField(max_length=500)
    answer = models.TextField()
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order']

    def __str__(self):
        return self.question[:80]