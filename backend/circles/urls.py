from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CircleViewSet

router = DefaultRouter()
router.register(r'', CircleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]