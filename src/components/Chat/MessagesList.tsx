import { MessageListProps } from "@/types/types";
import { Box, Text, Paper, ScrollArea, Flex } from "@mantine/core";

const MessageList = ({ messages, scrollAreaRef }: MessageListProps) => {
  return (
    <Box style={{ flex: 1, overflow: "hidden" }}>
      <ScrollArea h="100%" viewportRef={scrollAreaRef}>
        <Box p="md">
          {messages.map((message) => (
            <Flex
              key={message.id}
              justify={message.sender === "me" ? "flex-end" : "flex-start"}
              mb="xs"
            >
              <Paper
                p="xs"
                radius="md"
                bg={message.sender === "me" ? "blue.5" : "gray.2"}
                c={message.sender === "me" ? "white" : "dark"}
                style={{ maxWidth: "70%" }}
              >
                <Text size="sm">{message.text}</Text>
                <Text
                  size="xs"
                  c={message.sender === "me" ? "gray.1" : "gray.6"}
                  ta="right"
                >
                  {message.timestamp}
                </Text>
              </Paper>
            </Flex>
          ))}
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default MessageList;
