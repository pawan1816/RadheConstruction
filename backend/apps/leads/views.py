"""Leads views."""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import SalesStage, Lead, LeadNote, LeadFollowUp
from .serializers import (
    SalesStageSerializer, LeadSerializer, LeadCreateSerializer,
    LeadNoteSerializer, LeadFollowUpSerializer,
)


class SalesStageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SalesStage.objects.all()
    serializer_class = SalesStageSerializer
    permission_classes = [IsAuthenticated]


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.select_related('assigned_to', 'stage').prefetch_related('notes', 'follow_ups').all()
    filterset_fields = ['status', 'source', 'assigned_to', 'stage']
    search_fields = ['name', 'email', 'phone', 'message']

    def get_serializer_class(self):
        if self.action == 'create':
            return LeadCreateSerializer
        return LeadSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.role in ('admin', 'staff'):
            return self.queryset
        if user.role == 'engineer':
            return self.queryset.filter(assigned_to=user)
        return Lead.objects.none()

    @action(detail=True, methods=['post'])
    def add_note(self, request, pk=None):
        lead = self.get_object()
        serializer = LeadNoteSerializer(data={**request.data, 'lead': lead.pk, 'user': request.user.pk})
        serializer.is_valid(raise_exception=True)
        serializer.save(lead=lead, user=request.user)
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def schedule_followup(self, request, pk=None):
        lead = self.get_object()
        serializer = LeadFollowUpSerializer(data={**request.data, 'lead': lead.pk, 'user': request.user.pk})
        serializer.is_valid(raise_exception=True)
        serializer.save(lead=lead, user=request.user)
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        lead = self.get_object()
        lead.status = request.data.get('status', lead.status)
        lead.save()
        return Response({'success': True, 'status': lead.status})

    @action(detail=True, methods=['post'])
    def assign(self, request, pk=None):
        lead = self.get_object()
        lead.assigned_to_id = request.data.get('assigned_to')
        lead.save()
        return Response({'success': True, 'message': 'Lead assigned.'})

    @action(detail=True, methods=['post'])
    def score(self, request, pk=None):
        lead = self.get_object()
        lead.score = request.data.get('score', lead.score)
        lead.save()
        return Response({'success': True, 'score': lead.score})