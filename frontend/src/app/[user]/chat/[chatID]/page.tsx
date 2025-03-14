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
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const chatID = params.chatID as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatUser, setChatUser] = useState<{ name: string; avatar: string | null }>({ 
    name: "", 
    avatar: null 
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

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
          setMessages(chatMessages);
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
          setMessages(chatMessages);
        } catch (err) {
          console.error("Error polling messages:", err);
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [chatID, isAuthenticated]);

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

      setMessages((prevMessages) => [...prevMessages, sentMessage]);
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
