from rest_framework.decorators import api_view, permission_classes  # ✅ Fix this
from rest_framework.permissions import AllowAny  # ✅ Fix this
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Profile, Settings
from .serializers import ProfileSerializer, SettingsSerializer
from auth_app.models import UCLAUser


# Create your views here.
@api_view(["GET"])
@permission_classes([AllowAny])
def profile_list(request):
    profiles = Profile.objects.values("user__email", "bio", "major", "year", "interests", "gender", "location")
    return JsonResponse({"profiles": list(profiles)}, safe=False)

@api_view(["GET"])
@permission_classes([AllowAny])  
def debug_user(request):
    user = request.user  

    return JsonResponse({
        "is_authenticated": user.is_authenticated,
        "user": str(user),
        "user_id": getattr(user, "id", "No ID (AnonymousUser)"),
        "user_type": str(type(user)), 
        "headers": dict(request.headers), 
    })


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    queryset = Profile.objects.all()


    def get_queryset(self):
        return Profile.objects.all()


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # Only allow create/update if user is authenticated
    def create(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Authentication required"}, status=401)
        return super().create(request)

    def update(self, request, pk=None):
        if not request.user.is_authenticated:
            return Response({"error": "Authentication required"}, status=401)
        return super().update(request, pk)

class SettingsViewSet(viewsets.ModelViewSet):
    serializer_class = SettingsSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Settings.objects.all() #filter(user=self.request.user)

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

