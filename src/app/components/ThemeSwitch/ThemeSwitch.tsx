import {
  rem,
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

const ThemeSwitch = () => {
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Switch
      size="xl"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      onChange={toggleColorScheme}
      aria-label="Color Mode Switch"
    />
  );
};

export default ThemeSwitch;
