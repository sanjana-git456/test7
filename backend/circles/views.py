from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Circle, Quest
from .serializers import CircleSerializer

class CircleViewSet(viewsets.ModelViewSet):
    queryset = Circle.objects.all()
    serializer_class = CircleSerializer

    def perform_create(self, serializer):
        circle = serializer.save(owner=self.request.user)
        circle.members.add(self.request.user)

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        circle = self.get_object()
        circle.members.add(request.user)
        return Response({"status": "joined"})