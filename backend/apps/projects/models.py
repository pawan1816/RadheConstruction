"""
Projects app — Project portfolio, images, categories, progress tracking
"""
from django.db import models
from apps.core.models import TimeStampedModel


class ProjectCategory(TimeStampedModel):
    """Project categories."""
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Project categories'

    def __str__(self):
        return self.name


class Project(TimeStampedModel):
    """Construction project portfolio entry."""
    STATUS_CHOICES = [
        ('planning', 'Planning'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'),
    ]

    category = models.ForeignKey(ProjectCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='projects')
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True)
    client = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='client_projects')
    engineer = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='engineer_projects', limit_choices_to={'role': 'engineer'})
    location = models.CharField(max_length=300, blank=True)
    city = models.CharField(max_length=100, blank=True, default='Ranchi')
    state = models.CharField(max_length=100, blank=True, default='Jharkhand')
    area_sqft = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    budget_range = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    features = models.JSONField(default=list, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    completion_percentage = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # SEO
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.CharField(max_length=500, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class ProjectImage(TimeStampedModel):
    """Images associated with a project."""
    IMAGE_TYPE_CHOICES = [
        ('progress', 'Progress'),
        ('before', 'Before'),
        ('after', 'After'),
        ('gallery', 'Gallery'),
        ('drone', 'Drone'),
        ('blueprint', 'Blueprint'),
    ]
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='projects/')
    caption = models.CharField(max_length=300, blank=True)
    image_type = models.CharField(max_length=20, choices=IMAGE_TYPE_CHOICES, default='gallery')
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order']

    def __str__(self):
        return f"{self.project.title} — {self.get_image_type_display()}"


class ProjectProgress(TimeStampedModel):
    """Progress updates for a project."""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='progress_updates')
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    date = models.DateField()
    image = models.ImageField(upload_to='projects/progress/', blank=True, null=True)
    percentage = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.project.title} — {self.title}"