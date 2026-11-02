from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    bio = models.TextField(blank=True)
    avatar_url = models.URLField(blank=True)
    is_pro = models.BooleanField(default=False)

    def __str__(self):
        return self.username