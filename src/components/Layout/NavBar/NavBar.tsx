import { Box, Button, Skeleton, Stack } from "@mantine/core";
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

const NavBar = () => {
  const params = useParams();
  const user = params.user as string;

  return (
    <Stack h="100%" justify="space-between">
      <Stack justify="center">
        <Button
          justify="left"
          leftSection={<IconHome />}
          variant="transparent"
          size="xl"
          component={Link}
          href={`/${user}/home`}
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
          href={`/${user}/matches`}
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
          href={`/${user}/chat`}
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
          href={`/${user}/settings`}
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
          leftSection={<IconUserCircle />}
          rightSection={<IconArrowRight />}
          component={Link}
          href={`/${user}/profile`}
        >
          Burak Arslan
        </Button>
      </div>
    </Stack>
  );
};

export default NavBar;
