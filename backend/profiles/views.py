from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Profile, Settings
from .serializers import ProfileSerializer, SettingsSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Profile.objects.filter(user=self.request.user)
        return Profile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request):
        try:
            if request.user.is_authenticated:
                profile, created = Profile.objects.get_or_create(
                    user=request.user,
                    defaults={
                        "age": 18,
                    },
                )
                serializer = self.get_serializer(profile)
            else:
                profiles = Profile.objects.all()
                serializer = self.get_serializer(profiles, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": "Failed to retrieve profile", "detail": str(e)}, status=500)

    def create(self, request):
        try:
            if not request.user.is_authenticated:
                return Response({"error": "Must be authenticated to create a profile"}, status=401)
            profile, created = Profile.objects.get_or_create(
                user=request.user,
                defaults={
                    "age": 18,
                },
            )
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": "Failed to create profile", "detail": str(e)}, status=500)

    def update(self, request, pk=None):
        try:
            profile = self.get_object()
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": "Failed to update profile", "detail": str(e)}, status=500)


class SettingsViewSet(viewsets.ModelViewSet):
    serializer_class = SettingsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Settings.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request):
        settings, created = Settings.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(settings)
        return Response(serializer.data)

    def create(self, request):
        settings, created = Settings.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(settings, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def update(self, request, pk=None):
        settings = self.get_object()
        serializer = self.get_serializer(settings, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)