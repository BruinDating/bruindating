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

  console.log("Current chatID:", chatID); // for debugging

  const [messages, setMessages] = useState(
    mockMessages[chatID as keyof typeof mockMessages] || []
  );
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
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

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <Container size="md" h="100vh" p={0}>
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
