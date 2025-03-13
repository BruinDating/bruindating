import { Box, TextInput, Button, Group } from "@mantine/core";
import { IconSend, IconMoodSmile } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

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
  const [showPicker, setShowPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPicker) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPicker]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box p="md" style={{ borderTop: "1px solid #E9ECEF", position: "relative" }}>
      <Group align="center">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setShowPicker(!showPicker);
          }}
          variant="subtle"
        >
          <IconMoodSmile size={22} />
        </Button>
        {showPicker && (
          <Box
            ref={emojiPickerRef}
            style={{
              position: "absolute",
              bottom: "16px",
              left: "-335px",
              zIndex: 1000,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <EmojiPicker onEmojiClick={(emoji) => setNewMessage(newMessage + emoji.emoji)} />
          </Box>
        )}
        <TextInput
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.currentTarget.value)}
          onKeyDown={handleKeyPress}
          autoComplete="off"
          style={{ flex: 1 }}
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
