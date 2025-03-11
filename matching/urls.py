from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MatchViewSet, PotentialMatchViewSet

router = DefaultRouter()
router.register(r"matches", MatchViewSet, basename="match")
router.register(r"potential", PotentialMatchViewSet, basename="potential")

urlpatterns = [
    path("", include(router.urls)),
]
