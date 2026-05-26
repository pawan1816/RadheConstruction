"""Bookings views."""
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Booking, SiteVisit
from .serializers import BookingSerializer, BookingCreateSerializer, SiteVisitSerializer


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.select_related('user', 'service', 'engineer').all()
    filterset_fields = ['user', 'service', 'engineer', 'status', 'booking_type', 'date']
    search_fields = ['notes', 'location']
    ordering_fields = ['date', 'created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return BookingCreateSerializer
        return BookingSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role in ('admin', 'staff'):
            return self.queryset
        return self.queryset.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        booking = self.get_object()
        booking.status = 'cancelled'
        booking.save()
        return Response({'success': True, 'message': 'Booking cancelled.'})

    @action(detail=True, methods=['post'])
    def reschedule(self, request, pk=None):
        booking = self.get_object()
        booking.date = request.data.get('date', booking.date)
        booking.start_time = request.data.get('start_time', booking.start_time)
        booking.end_time = request.data.get('end_time', booking.end_time)
        booking.status = 'rescheduled'
        booking.save()
        return Response({'success': True, 'message': 'Booking rescheduled.'})

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        booking = self.get_object()
        booking.status = 'confirmed'
        booking.save()
        return Response({'success': True, 'message': 'Booking confirmed.'})