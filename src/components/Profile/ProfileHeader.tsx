import {
  Paper,
  Group,
  Avatar,
  Title,
  Badge,
  Button,
  Text,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { UserData } from "@/types/types";

const ProfileHeader = ({ userData }: { userData: UserData }) => {
  return (
    <Paper shadow="xs" p="md" radius="md" withBorder mb="xl">
      <Group justify="space-between" align="flex-start">
        <Group>
          <Avatar
            src={userData.avatar}
            size={120}
            radius="md"
            alt={userData.name}
          />
          <div>
            <Title order={2}>{userData.name}</Title>
            <Text size="sm" c="dimmed">
              @{userData.username}
            </Text>
            <Group mt="md">
              <Badge color="blue">{userData.major}</Badge>
              <Badge color="violet">{userData.year}</Badge>
              <Badge color="teal">{userData.age} years old</Badge>
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
