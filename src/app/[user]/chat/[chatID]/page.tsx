"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Paper, Flex, Loader, Center, Text } from "@mantine/core";
import MessageList from "@/components/Chat/MessagesList";
import ChatHeader from "@/components/Chat/ChatHeader";
import MessageInput from "@/components/Chat/MessageInput";
import {
  fetchChatMessages,
  sendChatMessage,
  fetchChatRooms,
} from "@/services/api";
import { useAuth } from "@/components/Auth/AuthContext";
import { Message } from "@/types/types";

const ChatPage = () => {
  const { isAuthenticated, user } = useAuth();
  const params = useParams();
  const chatID = params.chatID as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatUser, setChatUser] = useState({ name: "", avatar: null });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  
  // Current user's username, used to identify if a message was sent by the current user
  const currentUsername = user?.username || "dev_user";

  useEffect(() => {
    const loadChatData = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setError(null);

        const accessToken = localStorage.getItem("access_token");

        const rooms = await fetchChatRooms(accessToken);
        const currentRoom = rooms.find((room) => room.id === chatID);

        if (currentRoom) {
          const otherParticipant = currentRoom.participants[0];
          setChatUser({
            name: otherParticipant.username,
            avatar: otherParticipant.profile_picture,
          });

          const chatMessages = await fetchChatMessages(chatID, accessToken);
          
          // Mark current user's messages as "me"
          const processedMessages = chatMessages.map(msg => ({
            ...msg,
            sender: msg.sender === currentUsername ? "me" : msg.sender,
            // Format timestamp to be more user-friendly
            timestamp: formatTimestamp(msg.timestamp)
          }));
          
          setMessages(processedMessages);
        } else {
          setError("Chat room not found");
        }
      } catch (err) {
        setError("Failed to load chat. Please try again later.");
        console.error("Error loading chat:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadChatData();

    const intervalId = setInterval(async () => {
      if (isAuthenticated) {
        try {
          const accessToken = localStorage.getItem("access_token");
          const chatMessages = await fetchChatMessages(chatID, accessToken);
          
          // Mark current user's messages as "me" and format timestamps
          const processedMessages = chatMessages.map(msg => ({
            ...msg,
            sender: msg.sender === currentUsername ? "me" : msg.sender,
            timestamp: formatTimestamp(msg.timestamp)
          }));
          
          setMessages(processedMessages);
        } catch (err) {
          console.error("Error polling messages:", err);
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [chatID, isAuthenticated, currentUsername]);

  // Helper function to format timestamps
  const formatTimestamp = (timestamp: string): string => {
    try {
      // If timestamp is in ISO format, convert to a more friendly format
      if (timestamp.includes('T')) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      // If already in a friendly format, return as is
      return timestamp;
    } catch (error) {
      return timestamp; // Return original timestamp if error occurs
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const accessToken = localStorage.getItem("access_token");
      const sentMessage = await sendChatMessage(
        chatID,
        newMessage,
        accessToken
      );

      // Process sent message, mark as "me" and format timestamp
      const processedMessage = {
        ...sentMessage,
        sender: "me",
        timestamp: formatTimestamp(sentMessage.timestamp)
      };

      setMessages((prevMessages) => [...prevMessages, processedMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Message failed to send. Please check your network connection.");
    }
  };

  if (isLoading) {
    return (
      <Center h="50vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="50vh">
        <Text c="red">{error}</Text>
      </Center>
    );
  }

  return (
    <Container size="md" h="90vh" p={0}>
      <Paper shadow="xs" radius={0} h="100%">
        <Flex direction="column" h="100%">
          <ChatHeader user={chatUser} />
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