from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, SettingsViewSet
from .views import profile_list, debug_user


router = DefaultRouter()
router.register(r"", ProfileViewSet, basename="profile")
router.register(r"settings", SettingsViewSet, basename="settings")

urlpatterns = [
    path("", include(router.urls)),
    path("", profile_list, name="profile_list"),
    path("debug_user/", debug_user, name="debug_user"),

]
