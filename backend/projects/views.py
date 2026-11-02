from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Project, TrackVersion
from .serializers import ProjectSerializer, TrackVersionSerializer
from . import models

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(models.Q(owner=user) | models.Q(collaborators=user) | models.Q(privacy_tier='PUBLIC')).distinct()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def add_version(self, request, pk=None):
        project = self.get_object()
        last_version = project.versions.first()
        version_num = (last_version.version_number + 1) if last_version else 1
        
        serializer = TrackVersionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(project=project, version_number=version_num, created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)