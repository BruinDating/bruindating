import { Box, Button, Group, Avatar, Title, Divider } from "@mantine/core";
import { IconArrowLeft, IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";

interface ChatHeaderProps {
  user: {
    name: string;
    avatar: string | null;
  };
}

const ChatHeader = ({ user }: ChatHeaderProps) => {
  return (
    <>
      <Box p="md" bg="gray.1">
        <Group>
          <Button
            component={Link}
            href="../chat"
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
          >
            Back
          </Button>
          <Group>
            {user.avatar ? (
              <Avatar src={user.avatar} radius="xl" size="md" />
            ) : (
              <IconUserCircle size={40} />
            )}
            <Title order={4}>{user.name}</Title>
          </Group>
        </Group>
      </Box>
      <Divider />
    </>
  );
};

export default ChatHeader;
