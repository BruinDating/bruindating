import { Flex, Stack, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";

const Chat = () => {
  return (
    <Stack p="x3l">
      <ChatBox
        userName={"Luke"}
        lastText={"See you"}
        messageSentTime={"3:55 PM"}
      />
      <ChatBox
        userName={"Charles"}
        lastText={"Sup?"}
        messageSentTime={"7:38 PM"}
      />
      <ChatBox
        userName={"Jason"}
        lastText={"Gotchu"}
        messageSentTime={"12:25 AM"}
      />
    </Stack>
  );
};

export default Chat;

const ChatBox = ({
  userName,
  lastText,
  messageSentTime,
}: {
  userName: string;
  lastText: string;
  messageSentTime: string;
}) => {
  return (
    <Flex
      justify="space-between"
      component={Link}
      href="chat/chatID"
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
