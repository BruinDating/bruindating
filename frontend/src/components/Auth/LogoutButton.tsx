"use client";

import { Button } from "@mantine/core";
import { useAuth } from "./AuthContext";
import { IconLogout } from "@tabler/icons-react";

const LogoutButton = () => {
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button
      variant="subtle"
      color="red"
      onClick={handleLogout}
      loading={isLoading}
      leftSection={<IconLogout size={16} />}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
