import { Burger, Flex, Group } from "@mantine/core";
import ThemeSwitch from "@/components/Layout/ThemeSwitch/ThemeSwitch";

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
        <p>BruinDating</p>
      </Group>
      <ThemeSwitch />
    </Flex>
  );
};

export default Header;
