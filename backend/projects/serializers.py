from rest_framework import serializers
from .models import Project, TrackVersion
from core.serializers import UserSerializer

class TrackVersionSerializer(serializers.ModelSerializer):
    created_by_name = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = TrackVersion
        fields = ('id', 'version_number', 'file_url', 'notes', 'created_by_name', 'created_at')

class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    collaborators = UserSerializer(many=True, read_only=True)
    versions = TrackVersionSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'title', 'description', 'genre', 'privacy_tier', 'owner', 'collaborators', 'versions', 'created_at')