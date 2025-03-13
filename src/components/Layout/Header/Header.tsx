import { Burger, Flex, Group, Text, Avatar } from "@mantine/core";
import ThemeSwitch from "@/components/Layout/ThemeSwitch/ThemeSwitch";
import LogoutButton from "@/components/Auth/LogoutButton";
import { useAuth } from "@/components/Auth/AuthContext";

interface HeaderProps {
  mobileOpened: boolean;
  toggleMobile: React.MouseEventHandler<HTMLButtonElement>;
  desktopOpened: boolean;
  toggleDesktop: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = ({
  mobileOpened,
  toggleMobile,
  desktopOpened,
  toggleDesktop,
}: HeaderProps) => {
  const { user } = useAuth();

  return (
    <Flex h="100%" justify="space-between" align="center" px="xl">
      <Group h="100%">
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />
        <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="sm"
          size="sm"
        />
        <Text fw={700} size="lg">
          BruinDating
        </Text>
      </Group>
      <Group>
        {user && (
          <Group>
            <Avatar src={user?.profile_picture} radius="xl" />
            <Text>
              {user.first_name} {user.last_name}
            </Text>
          </Group>
        )}
        <ThemeSwitch />
        <LogoutButton />
      </Group>
    </Flex>
  );
};

export default Header;
