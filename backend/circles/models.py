from django.db import models
from django.conf import settings

class Circle(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owned_circles')
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='joined_circles', blank=True)
    invite_only = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Quest(models.Model):
    circle = models.ForeignKey(Circle, on_delete=models.CASCADE, related_name='quests')
    title = models.CharField(max_length=255)
    requirement = models.TextField()
    xp_reward = models.IntegerField(default=10)

    def __str__(self):
        return self.title