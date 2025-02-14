import { Burger, Group } from "@mantine/core";

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
    <Group h="100%" px="md">
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
  );
};

export default Header;
