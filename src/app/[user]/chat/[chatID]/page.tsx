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
  
  // 当前用户的用户名，用于识别消息是否是自己发送的
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
          
          // 标记当前用户的消息为"me"
          const processedMessages = chatMessages.map(msg => ({
            ...msg,
            sender: msg.sender === currentUsername ? "me" : msg.sender,
            // 格式化时间戳为更友好的格式
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
          
          // 标记当前用户的消息为"me"，并格式化时间戳
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

  // 格式化时间戳的辅助函数
  const formatTimestamp = (timestamp: string): string => {
    try {
      // 如果是ISO格式的时间戳，格式化为更友好的形式
      if (timestamp.includes('T')) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      // 如果已经是友好格式，则直接返回
      return timestamp;
    } catch (error) {
      return timestamp; // 发生错误时返回原始时间戳
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

      // 处理发送的消息，标记为"me"并格式化时间戳
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