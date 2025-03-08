import { Box, TextInput, Button, Group } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const MessageInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
}: MessageInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box p="md" style={{ borderTop: "1px solid #E9ECEF" }}>
      <Group align="flex-start">
        <TextInput
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.currentTarget.value)}
          onKeyDown={handleKeyPress}
          style={{ flex: 1 }}
          autoComplete="off"
        />
        <Button
          onClick={handleSendMessage}
          disabled={newMessage.trim() === ""}
          rightSection={<IconSend size={16} />}
        >
          Send
        </Button>
      </Group>
    </Box>
  );
};

export default MessageInput;
