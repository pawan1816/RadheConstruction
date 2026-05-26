"""Bookings serializers."""
from rest_framework import serializers
from .models import Booking, SiteVisit


class SiteVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteVisit
        fields = ['id', 'address', 'visit_date', 'visit_time', 'status', 'notes', 'feedback']


class BookingSerializer(serializers.ModelSerializer):
    site_visits = SiteVisitSerializer(many=True, read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True, default='')
    service_name = serializers.CharField(source='service.name', read_only=True, default='')
    engineer_name = serializers.CharField(source='engineer.get_full_name', read_only=True, default='')

    class Meta:
        model = Booking
        fields = ['id', 'user', 'user_name', 'service', 'service_name', 'engineer', 'engineer_name',
                  'project', 'booking_type', 'date', 'start_time', 'end_time', 'status',
                  'notes', 'meeting_link', 'location', 'site_visits', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['service', 'engineer', 'project', 'booking_type', 'date',
                  'start_time', 'end_time', 'notes', 'location']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)