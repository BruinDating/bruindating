"use client";

import { Card, Avatar, Text, Group, Badge, Button } from "@mantine/core";
import { IconHeart, IconMessage, IconPercentage } from "@tabler/icons-react";
import { MatchCardProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { likeProfile } from "@/services/api";
import { useState } from "react";

const MatchCard = ({ match, isPotential = false }: MatchCardProps) => {
  const params = useParams();
  const user = params.user as string;
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    try {
      setIsLiking(true);
      const accessToken = localStorage.getItem("access_token");
      await likeProfile(match.id.toString(), accessToken);
      // You might want to refresh the matches list or show a success message
    } catch (error) {
      console.error("Error liking profile:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={match.photos[0]}
          alt={match.name}
          width={300}
          height={300}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Group>
          <Avatar
            src={match.avatar && match.avatar !== "" ? match.avatar : null}
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
            href={`/${user}/chat/${match.username}`}
          >
            Message
          </Button>
        )}
      </Group>
    </Card>
  );
};

export default MatchCard;
