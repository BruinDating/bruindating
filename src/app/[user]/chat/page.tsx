import { Flex, Stack, Text, Avatar } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";

// mock data for testing
const getChatList = async () => {
  return [
    {
      id: "user-1",
      userName: "Luke",
      lastText: "See you at the Bruin Cafe at 3?",
      messageSentTime: "10:38 AM",
      avatar: "https://i.pravatar.cc/50?img=1",
    },
    {
      id: "user-2",
      userName: "Charles",
      lastText: "Same. This CS project is killing me.",
      messageSentTime: "7:50 PM",
      avatar: "https://i.pravatar.cc/50?img=2",
    },
    {
      id: "user-3",
      userName: "Jason",
      lastText: "Thanks!",
      messageSentTime: "12:25 PM",
      avatar: "https://i.pravatar.cc/50?img=3",
    },
  ];
};

// API connection
/**
const getChatList = async () => {
  const res = await fetch("https://api.example.com/chats");
  return res.json();
};
*/

export default async function Chat() {
  const chatList = await getChatList();

  return (
    <Stack p="xl">
      {chatList.map((chat) => (
        <ChatBox
          key={chat.id}
          id={chat.id}
          userName={chat.userName}
          lastText={chat.lastText}
          messageSentTime={chat.messageSentTime}
          avatar={chat.avatar}
        />
      ))}
    </Stack>
  );
}

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
  return (
    <Flex
      justify="space-between"
      component={Link}
      href={`/ethan/chat/${id}`}
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
        {avatar ? <Avatar src={avatar} radius="xl" size="md" /> : <IconUserCircle size={40} />}
        <Text>{userName}</Text>
        <Text>:</Text>
        <Text c="gray">{lastText}</Text>
      </Flex>
      <Text>{messageSentTime}</Text>
    </Flex>
  );
};
