"use client";

import { Flex, Avatar, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ChatBox = ({
  id,
  userName,
  lastText,
  messageSentTime,
  avatar,
}: {
  id: string;
  userName: string;
  lastText: string;
  messageSentTime: string;
  avatar: string | null;
}) => {
  const params = useParams();
  const user = params.user as string;
  return (
    <Flex
      justify="space-between"
      component={Link}
      href={`/${user}/chat/${id}`}
      align="center"
      p="xl"
      style={{
        border: "1px solid gray",
        borderRadius: "10px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <Flex gap={10} align="center">
        {avatar ? (
          <Avatar src={avatar} radius="xl" size="md" />
        ) : (
          <IconUserCircle size={40} />
        )}
        <Text>{userName}</Text>
        <Text>:</Text>
        <Text c="gray">{lastText}</Text>
      </Flex>
      <Text>{messageSentTime}</Text>
    </Flex>
  );
};

export default ChatBox;
