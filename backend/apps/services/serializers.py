"""Services serializers."""
from rest_framework import serializers
from .models import ServiceCategory, Service, ServiceFAQ


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'slug', 'icon', 'description', 'sort_order']


class ServiceFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFAQ
        fields = ['id', 'question', 'answer', 'sort_order']


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True, default='')
    faqs = ServiceFAQSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'category', 'category_name', 'name', 'slug', 'short_description',
                  'description', 'features', 'price_range_min', 'price_range_max', 'price_unit',
                  'hero_image', 'gallery', 'process_steps', 'is_featured', 'is_active',
                  'sort_order', 'meta_title', 'meta_description', 'meta_keywords',
                  'faqs', 'created_at', 'updated_at']


class ServiceListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True, default='')

    class Meta:
        model = Service
        fields = ['id', 'name', 'slug', 'short_description', 'category', 'category_name',
                  'price_range_min', 'price_range_max', 'price_unit', 'hero_image', 'is_featured']