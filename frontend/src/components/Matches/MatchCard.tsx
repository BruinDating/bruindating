"use client";

import { Card, Avatar, Text, Group, Badge, Button } from "@mantine/core";
import { IconHeart, IconMessage, IconPercentage } from "@tabler/icons-react";
import { MatchCardProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { likeProfile, createChatRoom } from "@/services/api";
import { useState } from "react";
import { notifications } from '@mantine/notifications';

const DEFAULT_PROFILE_IMAGE = "https://i.imgur.com/HeIi0wU.png";

const MatchCard = ({ match, isPotential = false, onMatchSuccess }: MatchCardProps) => {
  const params = useParams();
  const user = params.user as string;
  const [isLiking, setIsLiking] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const [isCreatingChatRoom, setIsCreatingChatRoom] = useState(false);

  const handleLike = async () => {
    try {
      setIsLiking(true);
      const accessToken = localStorage.getItem("access_token");
      const response = await likeProfile(match.id.toString(), accessToken);
      if (response.is_match && onMatchSuccess) {
        notifications.show({
          title: 'Match!',
          message: response.message,
          color: 'green',
        });
        onMatchSuccess();
      } else {
        notifications.show({
          title: 'Success',
          message: response.message,
          color: 'blue',
        });
      }
    } catch (error) {
      console.error("Error liking profile:", error);
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to like profile',
        color: 'red',
      });
    } finally {
      setIsLiking(false);
    }
  };

  const handleCreateChatRoom = async () => {
    if (chatRoomId) return chatRoomId;
    
    try {
      setIsCreatingChatRoom(true);
      const accessToken = localStorage.getItem("access_token");
      const roomId = await createChatRoom(match.id.toString(), accessToken);
      setChatRoomId(roomId);
      return roomId;
    } catch (error) {
      console.error("Error creating chat room:", error);
      notifications.show({
        title: 'Error',
        message: 'Failed to create chat room',
        color: 'red',
      });
      return null;
    } finally {
      setIsCreatingChatRoom(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={match.photos?.[0] || DEFAULT_PROFILE_IMAGE}
          alt={match.name}
          width={300}
          height={300}
          style={{ objectFit: "cover" }}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Group>
          <Avatar
            src={match.avatar && match.avatar !== "" ? match.avatar : DEFAULT_PROFILE_IMAGE}
            size="md"
            radius="xl"
          />
          <>
            <Text fw={700}>{match.name}</Text>
            <Text size="sm" c="dimmed">
              {match.major}, {match.year}
            </Text>
          </>
        </Group>
        {!isPotential && match.lastActive && (
          <Text size="xs" c="dimmed">
            Active {match.lastActive}
          </Text>
        )}
      </Group>

      <Text size="sm" lineClamp={2} mb="md">
        {match.bio}
      </Text>

      <Group gap={8} mb="md">
        {match.interests.slice(0, 3).map((interest, index) => (
          <Badge key={index} color="blue" variant="light">
            {interest}
          </Badge>
        ))}
        {match.interests.length > 3 && (
          <Badge color="gray" variant="light">
            +{match.interests.length - 3}
          </Badge>
        )}
      </Group>

      <Group justify="space-between" mt="auto">
        {isPotential ? (
          <Button
            leftSection={<IconHeart size={16} />}
            color="pink"
            variant="light"
            onClick={handleLike}
            loading={isLiking}
            fullWidth
          >
            Like
          </Button>
        ) : (
          <Button
            leftSection={<IconMessage size={16} />}
            color="blue"
            variant="light"
            fullWidth
            component={Link}
            href={`/${user}/chat/${chatRoomId || ''}`}
            onClick={async (e) => {
              if (!chatRoomId) {
                e.preventDefault();
                const newRoomId = await handleCreateChatRoom();
                if (newRoomId) {
                  window.location.href = `/${user}/chat/${newRoomId}`;
                }
              }
            }}
            loading={isCreatingChatRoom}
          >
            Message
          </Button>
        )}
      </Group>
    </Card>
  );
};

export default MatchCard;
