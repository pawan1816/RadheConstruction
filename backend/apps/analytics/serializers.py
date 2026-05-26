"""Analytics serializers."""
from rest_framework import serializers
from .models import AnalyticsEvent, DailyStat


class AnalyticsEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsEvent
        fields = ['id', 'event_type', 'event_data', 'page_url', 'referrer', 'created_at']
        read_only_fields = ['id', 'created_at']


class DailyStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyStat
        fields = ['date', 'total_leads', 'total_bookings', 'total_quotations',
                  'total_revenue', 'new_users', 'page_views']


class DashboardStatsSerializer(serializers.Serializer):
    total_projects = serializers.IntegerField()
    completed_projects = serializers.IntegerField()
    ongoing_projects = serializers.IntegerField()
    total_leads = serializers.IntegerField()
    total_bookings = serializers.IntegerField()
    total_quotations = serializers.IntegerField()
    total_revenue = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_users = serializers.IntegerField()
    total_testimonials = serializers.IntegerField()