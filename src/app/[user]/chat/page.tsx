import ChatBox from "@/components/Chat/ChatBox";
import { Stack } from "@mantine/core";

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
  const res = await fetch("https://your-backend.com/api/chats", {
    cache: "no-store", // disable cache
  });
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
