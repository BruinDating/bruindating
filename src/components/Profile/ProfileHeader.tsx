import {
  Paper,
  Group,
  Avatar,
  Title,
  Badge,
  Button,
  Text,
  Flex,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { profileDataProps } from "@/types/types";
import { useAuth } from "../Auth/AuthContext";

const ProfileHeader = ({ profileData }: { profileData: profileDataProps }) => {
  const { user } = useAuth();

  return (
    <Paper shadow="xs" p="md" radius="md" withBorder mb="xl">
      <Group justify="space-between" align="flex-start">
        <Group>
          <Avatar
            src={user?.profile_picture}
            size={120}
            radius="md"
            alt={"User PP"}
          />
          <div>
            <Flex gap={4}>
              <Title order={2}>{user?.first_name}</Title>
              <Title order={2}>{user?.last_name}</Title>
            </Flex>
            <Text size="sm" c="dimmed">
              @{user?.username}
            </Text>
            <Group mt="md">
              <Badge color="violet">{profileData.year}</Badge>
              <Badge color="teal">{profileData.age} years old</Badge>
            </Group>
          </div>
        </Group>
        <Button
          leftSection={<IconEdit size={16} />}
          variant="light"
          component="a"
          href="settings"
        >
          Edit Profile
        </Button>
      </Group>
    </Paper>
  );
};

export default ProfileHeader;
