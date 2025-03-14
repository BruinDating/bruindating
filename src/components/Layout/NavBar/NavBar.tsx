import { Avatar, Box, Button, Skeleton, Stack } from "@mantine/core";
import {
  IconHome,
  IconSearch,
  IconMessageCircle,
  IconSettings,
  IconUserCircle,
  IconArrowRight,
  IconHeart,
} from "@tabler/icons-react";
import { Divider } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/components/Auth/AuthContext";

const NavBar = () => {
  const params = useParams();
  const username = params.user as string;
  const { user } = useAuth();

  return (
    <Stack h="100%" justify="space-between">
      <Stack justify="center">
        <Button
          justify="left"
          leftSection={<IconHome />}
          variant="transparent"
          size="xl"
          component={Link}
          href={`/${username}/home`}
        >
          Home
        </Button>
        <Button
          justify="left"
          color="grape"
          leftSection={<IconHeart />}
          variant="transparent"
          size="xl"
          component={Link}
          href={`/${username}/matches`}
        >
          Matches
        </Button>
        <Button
          justify="left"
          color="teal"
          leftSection={<IconMessageCircle />}
          variant="transparent"
          size="xl"
          component={Link}
          href={`/${username}/chat`}
        >
          Messages
        </Button>
        <Button
          justify="left"
          color="orange"
          leftSection={<IconSettings />}
          variant="transparent"
          size="xl"
          component={Link}
          href={`/${username}/settings`}
        >
          Settings
        </Button>
      </Stack>
      <div>
        <Divider />
        <Button
          justify="space-between"
          fullWidth
          color="gray"
          variant="transparent"
          size="xl"
          leftSection={<Avatar src={user?.profile_picture} radius="xl" />}
          rightSection={<IconArrowRight />}
          component={Link}
          href={`/${username}/profile`}
        >
          {user ? `${user.first_name} ${user.last_name}` : 'User Profile'}
        </Button>
      </div>
    </Stack>
  );
};

export default NavBar;
