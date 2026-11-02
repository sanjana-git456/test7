from rest_framework import serializers
from .models import Circle, Quest
from core.serializers import UserSerializer

class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = '__all__'

class CircleSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    members_count = serializers.IntegerField(source='members.count', read_only=True)
    quests = QuestSerializer(many=True, read_only=True)

    class Meta:
        model = Circle
        fields = ('id', 'name', 'description', 'owner', 'members_count', 'quests', 'invite_only', 'created_at')