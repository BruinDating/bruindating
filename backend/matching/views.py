from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Match
from .serializers import MatchSerializer, PotentialMatchSerializer, UserSerializer
from auth_app.models import UCLAUser
from chat.models import ChatRoom
from django.db.models import Q


class MatchViewSet(viewsets.ModelViewSet):
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Match.objects.filter(user=user)

    def get_object(self):
        user = self.request.user
        match, created = Match.objects.get_or_create(user=user)
        return match

    @action(detail=False, methods=["get"])
    def matches(self, request):
        match = self.get_object()
        matched_users = match.matched.all()
        serializer = UserSerializer(matched_users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def approved(self, request):
        match = self.get_object()
        approved_users = match.approved.all()
        serializer = UserSerializer(approved_users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def rejected(self, request):
        match = self.get_object()
        rejected_users = match.rejected.all()
        serializer = UserSerializer(rejected_users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def super_liked(self, request):
        match = self.get_object()
        super_liked_users = match.super_liked.all()
        serializer = UserSerializer(super_liked_users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def approved_by(self, request):
        user = request.user
        approved_by_users = UCLAUser.objects.filter(match_profile__approved=user)
        serializer = UserSerializer(approved_by_users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def super_liked_by(self, request):
        user = request.user
        super_liked_by_users = UCLAUser.objects.filter(match_profile__super_liked=user)
        serializer = UserSerializer(super_liked_by_users, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def like(self, request, pk=None):
        return self.approve(request, pk)

    @action(detail=True, methods=["post"])
    def dislike(self, request, pk=None):
        return self.reject(request, pk)

    @action(detail=True, methods=["post"])
    def superlike(self, request, pk=None):
        return self.super_like(request, pk)

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        try:
            # First try to get user by ID
            target_user = UCLAUser.objects.filter(pk=pk).first()
            
            # If not found, try to get user by profile ID
            if not target_user:
                from profiles.models import Profile
                profile = Profile.objects.filter(pk=pk).first()
                if profile:
                    target_user = profile.user
                
            if not target_user:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"Failed to find user: {str(e)}"}, status=status.HTTP_404_NOT_FOUND)

        if target_user == request.user:
            return Response({"error": "You cannot approve yourself"}, status=status.HTTP_400_BAD_REQUEST)

        user_match, _ = Match.objects.get_or_create(user=request.user)
        target_match, _ = Match.objects.get_or_create(user=target_user)

        user_match.approved.add(target_user)

        if target_user in user_match.rejected.all():
            user_match.rejected.remove(target_user)

        is_match = request.user in target_match.approved.all()

        if is_match:
            user_match.matched.add(target_user)
            target_match.matched.add(request.user)

            # Check if a chat room already exists for these users
            existing_chat_room = ChatRoom.objects.filter(
                participants=request.user
            ).filter(
                participants=target_user
            ).first()

            if not existing_chat_room:
                # Create a chat room only if one doesn't exist
                chat_room = ChatRoom.objects.create(
                    name=f"Chat between {request.user.first_name} and {target_user.first_name}"
                )
                chat_room.participants.add(request.user, target_user)

            return Response(
                {"status": "approved", "is_match": True, "message": f"You matched with {target_user.first_name} {target_user.last_name}!"},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"status": "approved", "is_match": False, "message": f"You approved {target_user.first_name} {target_user.last_name}"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        try:
            target_user = UCLAUser.objects.get(pk=pk)
        except UCLAUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if target_user == request.user:
            return Response({"error": "You cannot reject yourself"}, status=status.HTTP_400_BAD_REQUEST)

        # Get both user's match objects
        user_match, _ = Match.objects.get_or_create(user=request.user)
        target_match, _ = Match.objects.get_or_create(user=target_user)

        # Remove from each other's matches and approved lists
        user_match.matched.remove(target_user)
        user_match.approved.remove(target_user)
        target_match.matched.remove(request.user)
        target_match.approved.remove(request.user)

        # Add to rejected
        user_match.rejected.add(target_user)

        # Delete any chat rooms between these users
        ChatRoom.objects.filter(
            participants=request.user
        ).filter(
            participants=target_user
        ).delete()

        return Response(
            {"status": "rejected", "message": f"You rejected {target_user.first_name} {target_user.last_name}"}, 
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=["post"])
    def super_like(self, request, pk=None):
        try:
            target_user = UCLAUser.objects.get(pk=pk)
        except UCLAUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if target_user == request.user:
            return Response({"error": "You cannot super like yourself"}, status=status.HTTP_400_BAD_REQUEST)

        user_match, _ = Match.objects.get_or_create(user=request.user)
        target_match, _ = Match.objects.get_or_create(user=target_user)

        user_match.super_liked.add(target_user)
        user_match.approved.add(target_user)

        if target_user in user_match.rejected.all():
            user_match.rejected.remove(target_user)

        is_match = request.user in target_match.approved.all()

        if is_match:
            user_match.matched.add(target_user)
            target_match.matched.add(request.user)

            return Response(
                {"status": "super_liked", "is_match": True, "message": f"You matched with {target_user.first_name} {target_user.last_name}!"},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"status": "super_liked", "is_match": False, "message": f"You super liked {target_user.first_name} {target_user.last_name}"},
            status=status.HTTP_200_OK,
        )


class PotentialMatchViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PotentialMatchSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        user_match, _ = Match.objects.get_or_create(user=user)

        rejected_users = user_match.rejected.all()
        matched_users = user_match.matched.all()

        excluded_users = set()
        for excluded_user in list(rejected_users) + list(matched_users):
            excluded_users.add(excluded_user.id)

        excluded_users.add(user.id)

        potential_matches = UCLAUser.objects.exclude(id__in=excluded_users).select_related("profile")

        return potential_matches
