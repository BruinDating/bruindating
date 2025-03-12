import React from 'react';
import { ScrollArea, Text, Box, Flex, Stack } from '@mantine/core';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface MessagesListProps {
  messages: Message[];
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, scrollAreaRef }) => {
  return (
    <ScrollArea style={{ height: 'calc(90vh - 120px)' }} viewportRef={scrollAreaRef}>
      <Stack spacing="xs" p="md">
        {messages.map((message) => {
          const isCurrentUser = message.sender === "me";
          
          return (
            <Flex 
              key={message.id} 
              justify={isCurrentUser ? "flex-end" : "flex-start"}
              w="100%"
            >
              <Box
                p="xs"
                style={{
                  maxWidth: '70%',
                  backgroundColor: isCurrentUser ? '#e3f2fd' : '#f5f5f5',
                  borderRadius: '8px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                }}
              >
                {!isCurrentUser && (
                  <Text size="xs" weight={500} color="dimmed">
                    {message.sender}
                  </Text>
                )}
                <Text>{message.text}</Text>
                <Text size="xs" align="right" color="dimmed">
                  {message.timestamp}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Stack>
    </ScrollArea>
  );
};

export default MessagesList; 