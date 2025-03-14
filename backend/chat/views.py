from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ChatRoom
from .serializers import ChatRoomSerializer, MessageSerializer
from django.db.models import Q
from django.contrib.auth import get_user_model
import logging
from matching.models import Match

logger = logging.getLogger(__name__)
User = get_user_model()

class ChatRoomViewSet(viewsets.ModelViewSet):
    serializer_class = ChatRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        try:
            logger.info(f"Fetching chat rooms for user {self.request.user.id}")
            # First clean up any chat rooms without valid matches
            self.cleanup_invalid_chat_rooms()
            # Then return valid chat rooms
            queryset = ChatRoom.objects.filter(participants=self.request.user)
            logger.info(f"Found {queryset.count()} chat rooms")
            return queryset
        except Exception as e:
            logger.error(f"Error fetching chat rooms: {str(e)}")
            raise

    def cleanup_invalid_chat_rooms(self):
        """Remove chat rooms where participants are no longer matched."""
        try:
            # Get all chat rooms for the current user
            user_chat_rooms = ChatRoom.objects.filter(participants=self.request.user)
            
            for room in user_chat_rooms:
                # Get the other participant
                other_participant = room.participants.exclude(id=self.request.user.id).first()
                if not other_participant:
                    room.delete()
                    continue

                # Check if they are still matched
                user_match = Match.objects.filter(user=self.request.user, matched=other_participant).exists()
                other_match = Match.objects.filter(user=other_participant, matched=self.request.user).exists()

                # If either user has unmatched, delete the chat room
                if not (user_match and other_match):
                    logger.info(f"Deleting chat room {room.id} as users are no longer matched")
                    room.delete()

        except Exception as e:
            logger.error(f"Error cleaning up chat rooms: {str(e)}")

    def create(self, request, *args, **kwargs):
        target_user_id = request.data.get('target_user_id')
        if not target_user_id:
            return Response(
                {'message': 'target_user_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            target_user = User.objects.get(id=target_user_id)
        except User.DoesNotExist:
            return Response(
                {'message': 'Target user not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            # Check if a chat room already exists between these users
            existing_room = ChatRoom.objects.filter(
                participants=request.user
            ).filter(
                participants=target_user
            ).first()

            if existing_room:
                logger.info(f"Found existing chat room {existing_room.id} between users {request.user.id} and {target_user.id}")
                serializer = self.get_serializer(existing_room)
                return Response(serializer.data)

            # Create new chat room
            chat_room = ChatRoom.objects.create(
                name=f"Chat between {request.user.first_name} and {target_user.first_name}"
            )
            chat_room.participants.add(request.user, target_user)
            logger.info(f"Created new chat room {chat_room.id} between users {request.user.id} and {target_user.id}")
            
            serializer = self.get_serializer(chat_room)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error creating chat room: {str(e)}")
            return Response(
                {'message': f'Failed to create chat room: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=["get"])
    def messages(self, request, pk=None):
        try:
            room = self.get_object()
            messages = room.messages.all()
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error fetching messages: {str(e)}")
            return Response(
                {'message': f'Failed to fetch messages: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=["post"])
    def mark_read(self, request, pk=None):
        try:
            room = self.get_object()
            room.messages.filter(~Q(sender=request.user), is_read=False).update(is_read=True)
            return Response({"status": "messages marked as read"})
        except Exception as e:
            logger.error(f"Error marking messages as read: {str(e)}")
            return Response(
                {'message': f'Failed to mark messages as read: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
