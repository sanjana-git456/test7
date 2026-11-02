from django.db import models
from django.conf import settings

class Project(models.Model):
    PRIVACY_TIERS = [
        ('PUBLIC', 'Public'),
        ('PRIVATE', 'Private'),
        ('ANONYMOUS', 'Anonymous'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    genre = models.CharField(max_length=100)
    privacy_tier = models.CharField(max_length=20, choices=PRIVACY_TIERS, default='PUBLIC')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owned_projects')
    collaborators = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='collaborating_projects', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class TrackVersion(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='versions')
    version_number = models.IntegerField()
    file_url = models.URLField() # Mocked as a URL for simplicity
    notes = models.TextField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-version_number']