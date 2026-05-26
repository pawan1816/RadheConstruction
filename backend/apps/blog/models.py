"""
Blog app — Blog posts, categories, tags with SEO support
"""
from django.db import models
from apps.core.models import TimeStampedModel


class BlogCategory(TimeStampedModel):
    """Blog categories."""
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Blog categories'

    def __str__(self):
        return self.name


class BlogTag(TimeStampedModel):
    """Blog tags."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class BlogPost(TimeStampedModel):
    """Blog post with full SEO support."""
    author = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='blog_posts')
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts')
    tags = models.ManyToManyField(BlogTag, blank=True, related_name='posts')
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True)
    excerpt = models.CharField(max_length=500, blank=True)
    content = models.TextField()
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    # SEO
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.CharField(max_length=500, blank=True)
    meta_keywords = models.CharField(max_length=500, blank=True)
    canonical_url = models.URLField(blank=True)
    # Stats
    views_count = models.PositiveIntegerField(default=0)
    reading_time = models.PositiveIntegerField(default=5, help_text='Reading time in minutes')

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title