"use client";

import { useEffect, useState } from "react";
import { Flex, Stack, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { Avatar } from "@mantine/core";
import Link from "next/link";

// mock data for chat list - use to test the UI
const defaultChatList = [
  { id: "user-1", userName: "Luke", lastText: "See you at the Bruin Cafe at 3?", messageSentTime: "10:38 AM", avatar: "https://i.pravatar.cc/50?img=1" },
  { id: "user-2", userName: "Charles", lastText: "Same. This CS project is killing me.", messageSentTime: "7:50 PM", avatar: "https://i.pravatar.cc/50?img=2" },
  { id: "user-3", userName: "Jason", lastText: "Thanks!", messageSentTime: "12:25 PM", avatar: "https://i.pravatar.cc/50?img=3" },
];


const Chat = () => {
  const [chatList, setChatList] = useState(defaultChatList);

  useEffect(() => {
    // fetch chat list from endpoint
    /*
    fetch("/api/chats")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetch chat list:", data);
        setChatList(data);
      })
      .catch((err) => console.error("Failed:", err));
    */
    }, []);

    return (
      <Stack p="xl">
        {chatList.map((chat) => (
          <ChatBox
            key={chat.id} // use `id` as key
            id={chat.id}  // transfer `id` to ChatBox
            userName={chat.userName}
            lastText={chat.lastText}
            messageSentTime={chat.messageSentTime}
            avatar={chat.avatar} // ✅ 传递头像数据
          />
        ))}
      </Stack>
    );
  };

  export default Chat;

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
        href={`/ethan/chat/${id}`} // ensure the link is correct
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
          <Avatar src={avatar} radius="xl" size="md" /> // ✅ 正确渲染头像
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
