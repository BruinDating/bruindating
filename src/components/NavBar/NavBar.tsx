import { Box, Button, Skeleton, Stack } from "@mantine/core";
import {
  IconHome,
  IconSearch,
  IconMessageCircle,
  IconSettings,
  IconUserCircle,
  IconArrowRight,
} from "@tabler/icons-react";
import { Divider } from "@mantine/core";

const NavBar = () => {
  return (
    <Stack h="100%" justify="space-between">
      <Stack justify="center">
        <Button
          justify="left"
          leftSection={<IconHome />}
          variant="transparent"
          size="xl"
        >
          Home
        </Button>
        <Button
          justify="left"
          color="violet"
          leftSection={<IconSearch />}
          variant="transparent"
          size="xl"
        >
          Search
        </Button>
        <Button
          justify="left"
          color="teal"
          leftSection={<IconMessageCircle />}
          variant="transparent"
          size="xl"
        >
          Messages
        </Button>
        <Button
          justify="left"
          color="orange"
          leftSection={<IconSettings />}
          variant="transparent"
          size="xl"
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
        >
          Burak Arslan
        </Button>
      </div>
    </Stack>
  );
};

export default NavBar;
