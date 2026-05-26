"""
Accounts app — Custom User model with roles, EngineerProfile
"""
from django.contrib.auth.models import AbstractUser
from django.db import models
from apps.core.models import TimeStampedModel


class User(AbstractUser):
    """Custom user model with role-based access."""
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('staff', 'Staff'),
        ('engineer', 'Engineer'),
        ('customer', 'Customer'),
    ]

    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True, default='Ranchi')
    state = models.CharField(max_length=100, blank=True, default='Jharkhand')
    pincode = models.CharField(max_length=10, blank=True)
    is_verified = models.BooleanField(default=False)
    company_name = models.CharField(max_length=200, blank=True)
    gst_number = models.CharField(max_length=20, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name']

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"

    @property
    def is_admin(self):
        return self.role == 'admin' or self.is_superuser

    @property
    def is_engineer(self):
        return self.role == 'engineer'


class EngineerProfile(TimeStampedModel):
    """Extended profile for engineer users."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='engineer_profile')
    specialization = models.CharField(max_length=200, blank=True)
    experience_years = models.PositiveIntegerField(default=0)
    certifications = models.JSONField(default=list, blank=True)
    projects_completed = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    bio = models.TextField(blank=True)
    availability = models.BooleanField(default=True)

    class Meta:
        ordering = ['-rating']

    def __str__(self):
        return f"Engineer: {self.user.get_full_name()}"