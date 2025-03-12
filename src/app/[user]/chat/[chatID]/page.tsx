"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Paper, Flex } from "@mantine/core";
import { mockMessages, mockUsers } from "@/mockData/mockData";
import MessageList from "@/components/Chat/MessagesList";
import ChatHeader from "@/components/Chat/ChatHeader";
import MessageInput from "@/components/Chat/MessageInput";

const ChatPage = () => {
  const params = useParams();
  const chatID = params.chatID as string;

  console.log("Current chatID:", chatID); // Debugging output chatID

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("disconnected");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null); // WebSocket connection
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userIdRef = useRef<string | null>(null); // Reference to keep track of userId for closures
  const processedMessagesRef = useRef<Set<string>>(new Set()); // Track processed message IDs

  const user = mockUsers[chatID as keyof typeof mockUsers] || {
    name: "User",
    avatar: null,
  };

  // Update userIdRef whenever userId changes
  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  // **Auto-scroll to the latest message**
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // WebSocket connection management
  useEffect(() => {
    const connectWebSocket = () => {
      // Make sure to use a valid room name (alphanumeric with underscores)
      // The regex in routing.py is r"ws/chat/(?P<room_name>\w+)/$"
      // So we need to ensure chatID only contains word characters (alphanumeric plus underscore)
      const safeRoomId = chatID.replace(/[^\w]/g, '_');
      
      // Use the correct backend WebSocket URL - adjust this based on your backend setup
      const wsUrl = `ws://localhost:8000/ws/chat/${safeRoomId}/`;
      console.log("Connecting to WebSocket at:", wsUrl);
      
      try {
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
          console.log("WebSocket connected successfully!");
          setConnectionStatus("connected");
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("WebSocket message received:", data);

            // Handle different message types
            switch (data.type) {
              case "user_info":
                console.log("Received user_info with ID:", data.user_id);
                setUserId(data.user_id);
                break;
              case "chat_message":
                console.log("Received chat_message:", data.message, "from user:", data.user_id);
                // Create a unique message ID using user_id, timestamp, and message content
                const messageId = `${data.user_id}-${data.timestamp}-${data.message.substring(0, 10)}`;
                
                // Check if we've already processed this message
                if (processedMessagesRef.current.has(messageId)) {
                  console.log("Skipping duplicate message:", messageId);
                  return;
                }
                
                // Add message ID to the set of processed messages
                processedMessagesRef.current.add(messageId);
                
                // Use userIdRef.current to get the latest userId value
                const currentUserId = userIdRef.current;
                const newMsg = {
                  id: messageId,
                  text: data.message,
                  sender: data.user_id === currentUserId ? "me" : data.user_id,
                  timestamp: data.timestamp,
                };
                console.log("Adding message to state:", newMsg);
                setMessages((prevMessages) => [...prevMessages, newMsg]);
                break;
              case "user_joined":
                console.log(`User ${data.user_id} joined. Current users:`, data.users);
                setUsers(data.users);
                break;
              case "user_left":
                console.log(`User ${data.user_id} left. Current users:`, data.users);
                setUsers(data.users);
                break;
              default:
                console.log("Unknown message type:", data.type);
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error, event.data);
          }
        };

        socket.onerror = (error) => {
          console.error("WebSocket Error:", error);
          setConnectionStatus("error");
        };

        socket.onclose = (event) => {
          console.log("WebSocket closed with code:", event.code, "reason:", event.reason);
          setConnectionStatus("disconnected");
          
          // Attempt to reconnect after 3 seconds
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
          }
          
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("Attempting to reconnect WebSocket...");
            connectWebSocket();
          }, 3000);
        };
      } catch (error) {
        console.error("Error creating WebSocket connection:", error);
        setConnectionStatus("error");
      }
    };

    console.log("Setting up WebSocket connection...");
    // Reset processed messages when connecting to a new chat
    processedMessagesRef.current = new Set();
    connectWebSocket();

    // Cleanup on component unmount
    return () => {
      console.log("Cleaning up WebSocket connection...");
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [chatID]);

  // **Send message**
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    
    console.log("Attempting to send message:", newMessage);
    console.log("WebSocket ready state:", socketRef.current?.readyState);
    
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      alert("Not connected to chat server. Please try again.");
      return;
    }

    try {
      // Send the message through WebSocket
      const messageData = {
        message: newMessage,
      };
      console.log("Sending message data:", messageData);
      
      socketRef.current.send(JSON.stringify(messageData));
      console.log("Message sent successfully");

      // Clear the input field
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Message failed to send. Please check your connection.");
    }
  };

  return (
    <Container size="md" h="90vh" p={0}>
      <Paper shadow="xs" radius={0} h="100%">
        <Flex direction="column" h="100%">
          <ChatHeader user={user} />
          {connectionStatus !== "connected" && (
            <div style={{ padding: '10px', backgroundColor: '#fff3cd', color: '#856404', textAlign: 'center' }}>
              {connectionStatus === "disconnected" ? "Disconnected from chat server" : "Error connecting to chat server"}
            </div>
          )}
          {userId && (
            <div style={{ padding: '5px', backgroundColor: '#d4edda', color: '#155724', textAlign: 'center', fontSize: '0.8rem' }}>
              Connected as user: {userId}
            </div>
          )}
          <MessageList messages={messages} scrollAreaRef={scrollAreaRef} />
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
          />
        </Flex>
      </Paper>
    </Container>
  );
};

export default ChatPage; 