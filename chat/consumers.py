from channels.generic.websocket import AsyncWebsocketConsumer
import json
from datetime import datetime
import uuid
import logging

# Set up logging
logger = logging.getLogger('chat')
logger.setLevel(logging.DEBUG)
if not logger.handlers:
    # Add console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    logger.addHandler(console_handler)

class ChatConsumer(AsyncWebsocketConsumer):
    # Class variable to store all connected users
    connected_users = {}

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        # Generate unique ID for new user
        self.user_id = str(uuid.uuid4())[:8]
        logger.debug(f"New connection - Generated user_id: {self.user_id} for room: {self.room_name}")

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        logger.debug(f"User {self.user_id} added to group: {self.room_group_name}")

        # Store user information
        self.connected_users[self.user_id] = {"channel_name": self.channel_name, "room": self.room_name}
        logger.debug(f"Current connected users: {list(self.connected_users.keys())}")

        await self.accept()
        logger.debug(f"WebSocket connection accepted for user: {self.user_id}")

        # Send the user their ID
        await self.send(json.dumps({"type": "user_info", "user_id": self.user_id}))
        logger.debug(f"Sent user_info to user: {self.user_id}")

        # Notify others that a new user has joined
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "user_joined", "user_id": self.user_id, "users": list(self.connected_users.keys())}
        )
        logger.debug(f"Notified group about new user: {self.user_id}")

    async def disconnect(self, close_code):
        logger.debug(f"WebSocket disconnect initiated for user: {getattr(self, 'user_id', 'unknown')} with code: {close_code}")
        
        if hasattr(self, "user_id"):
            # Remove user from connected users
            self.connected_users.pop(self.user_id, None)
            logger.debug(f"Removed user {self.user_id} from connected users. Remaining: {list(self.connected_users.keys())}")

            # Notify others that user has left
            await self.channel_layer.group_send(
                self.room_group_name, {"type": "user_left", "user_id": self.user_id, "users": list(self.connected_users.keys())}
            )
            logger.debug(f"Notified group that user {self.user_id} has left")

        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        logger.debug(f"User removed from group: {self.room_group_name}")

    async def receive(self, text_data):
        logger.debug(f"Received message from user {self.user_id}: {text_data}")
        
        try:
            data = json.loads(text_data)
            
            # Check if this is a client-provided user ID
            if data.get("type") == "set_user_id" and "user_id" in data:
                client_user_id = data["user_id"]
                logger.debug(f"Client requested to set user_id to: {client_user_id}")
                
                # Validate and update user ID
                if client_user_id and isinstance(client_user_id, str) and len(client_user_id) <= 12:
                    old_user_id = self.user_id
                    
                    # Update our records
                    if old_user_id in self.connected_users:
                        user_data = self.connected_users.pop(old_user_id)
                        self.connected_users[client_user_id] = user_data
                    
                    self.user_id = client_user_id
                    logger.debug(f"User ID updated from {old_user_id} to {client_user_id}")
                    
                    # Confirm the user ID change
                    await self.send(json.dumps({"type": "user_info", "user_id": self.user_id}))
                    return
            
            # Regular message handling
            if "message" in data:
                message = data["message"]
                logger.debug(f"Broadcasting message from {self.user_id}: {message}")
                
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name, 
                    {
                        "type": "chat_message", 
                        "message": message, 
                        "user_id": self.user_id, 
                        "timestamp": datetime.now().strftime("%H:%M")
                    }
                )
        except json.JSONDecodeError:
            logger.error(f"Failed to decode JSON from message: {text_data}")
        except Exception as e:
            logger.error(f"Error processing message: {str(e)}")

    async def chat_message(self, event):
        logger.debug(f"Sending chat_message to user {self.user_id}: {event['message']}")
        
        await self.send(
            text_data=json.dumps({
                "type": "chat_message", 
                "message": event["message"], 
                "user_id": event["user_id"], 
                "timestamp": event["timestamp"]
            })
        )

    async def user_joined(self, event):
        logger.debug(f"Sending user_joined notification to {self.user_id} about {event['user_id']}")
        
        await self.send(text_data=json.dumps({
            "type": "user_joined", 
            "user_id": event["user_id"], 
            "users": event["users"]
        }))

    async def user_left(self, event):
        logger.debug(f"Sending user_left notification to {self.user_id} about {event['user_id']}")
        
        await self.send(text_data=json.dumps({
            "type": "user_left", 
            "user_id": event["user_id"], 
            "users": event["users"]
        }))
