from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, SettingsViewSet

router = DefaultRouter()
router.register(r"", ProfileViewSet, basename="profile")
router.register(r"settings", SettingsViewSet, basename="settings")

urlpatterns = [
    path("", include(router.urls)),
]
