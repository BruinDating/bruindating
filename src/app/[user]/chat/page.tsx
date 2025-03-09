"use client";

import { useEffect, useState } from "react";
import { Flex, Stack, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";

// mock data for chat list - use to test the UI
const defaultChatList = [
  { id: "user-1", userName: "Luke", lastText: "See you", messageSentTime: "3:55 PM" },
  { id: "user-2", userName: "Charles", lastText: "Sup?", messageSentTime: "7:38 PM" },
  { id: "user-3", userName: "Jason", lastText: "Gotchu", messageSentTime: "12:25 AM" },
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
  }: {
    id: string;
    userName: string;
    lastText: string;
    messageSentTime: string;
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
        <Flex gap={10}>
          <IconUserCircle />
          <Text>{userName}</Text>
          <Text>:</Text>
          <Text c="gray">{lastText}</Text>
        </Flex>
        <Text>{messageSentTime}</Text>
      </Flex>
    );
  };
