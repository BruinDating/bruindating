"use client";

import { useEffect, useState } from "react";
import ChatBox from "@/components/Chat/ChatBox";
import { Stack, Loader, Center, Text } from "@mantine/core";
import { fetchChatRooms } from "@/services/api";
import { useAuth } from "@/components/Auth/AuthContext";
import { useParams } from "next/navigation";
import { ChatRoom } from "@/types/types";

const Chat = () => {
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const currentUser = params.user as string;
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChatRooms = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setError(null);

        const accessToken = localStorage.getItem("access_token");
        const rooms = await fetchChatRooms(accessToken);
        setChatRooms(rooms);
      } catch (err) {
        setError("Failed to load chat rooms. Please try again later.");
        console.error("Error loading chat rooms:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadChatRooms();
  }, [isAuthenticated]);

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

  if (chatRooms.length === 0) {
    return (
      <Center h="50vh">
        <Text>No conversations yet. Match with someone to start chatting!</Text>
      </Center>
    );
  }

  return (
    <Stack p="xl">
      {chatRooms.map((room) => {
        // Find the other participant (not the current user)
        const otherParticipant = room.participants.find(
          (p) => p.username !== currentUser
        ) || room.participants[0];

        return (
          <ChatBox
            key={room.id}
            id={room.id}
            userName={otherParticipant.username}
            lastText={room.last_message?.content || "Start a conversation!"}
            messageSentTime={
              room.last_message
                ? new Date(room.last_message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""
            }
            avatar={otherParticipant.profile_picture || ""}
          />
        );
      })}
    </Stack>
  );
};

export default Chat;
