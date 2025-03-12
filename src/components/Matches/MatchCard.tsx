"use client";

import { Card, Avatar, Text, Group, Badge, Button } from "@mantine/core";
import { IconHeart, IconMessage, IconPercentage } from "@tabler/icons-react";
import { MatchCardProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const MatchCard = ({ match, isPotential = false }: MatchCardProps) => {
  const params = useParams();
  const user = params.user as string;

  const handleLike = () => {
    console.log("Like", match.name);
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
          <Avatar src={match.avatar} size="md" radius="xl" />
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
