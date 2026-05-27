"""Projects admin."""
from django.contrib import admin
from .models import ProjectCategory, Project, ProjectImage, ProjectProgress


@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'category', 'status', 'location', 'completion_percentage', 'is_featured', 'created_at']
    list_filter = ['category', 'status', 'is_featured', 'city']
    search_fields = ['title', 'location', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['status', 'is_featured']


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ['project', 'caption', 'image_type', 'sort_order']
    list_filter = ['image_type', 'project']


@admin.register(ProjectProgress)
class ProjectProgressAdmin(admin.ModelAdmin):
    list_display = ['project', 'title', 'date', 'percentage']
    list_filter = ['project']