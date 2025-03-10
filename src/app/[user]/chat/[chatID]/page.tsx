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

  console.log("Current chatID:", chatID);

  const [messages, setMessages] = useState(
    mockMessages[chatID as keyof typeof mockMessages] || []
  );
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const user = mockUsers[chatID as keyof typeof mockUsers] || {
    name: "User",
    avatar: null,
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // **🔗 WebSocket listener for new messages (currently commented)**
  /*
  useEffect(() => {
    const socket = new WebSocket(`wss://your-backend.com/ws/chat/${chatID}`);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      socket.close();
    };
  }, [chatID]);
  */

  // **Send message**
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      text: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      // **🔗 Future API integration**
      /*
      const res = await fetch("https://your-backend.com/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const savedMessage = await res.json();
      */

      // **🔗 Future WebSocket message sending**
      /*
      if (socketRef.current) {
        socketRef.current.send(JSON.stringify(newMsg));
      }
      */

      // **Use mock data for now**
      const savedMessage = { id: messages.length + 1, ...newMsg };

      // **Update frontend UI**
      setMessages([...messages, savedMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Message failed to send. Please check your network connection.");
    }
  };

  return (
    <Container size="md" h="90vh" p={0}>
      <Paper shadow="xs" radius={0} h="100%">
        <Flex direction="column" h="100%">
          <ChatHeader user={user} />
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
