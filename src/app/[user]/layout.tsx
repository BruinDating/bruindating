"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "@/components/Layout/Header/Header";
import NavBar from "@/components/Layout/NavBar/NavBar";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <ProtectedRoute>
      <AppShell
        header={{ height: 70 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
      >
        <AppShell.Header>
          <Header
            mobileOpened={mobileOpened}
            toggleMobile={toggleMobile}
            desktopOpened={desktopOpened}
            toggleDesktop={toggleDesktop}
          />
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <NavBar />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </ProtectedRoute>
  );
};

export default HomeLayout;
