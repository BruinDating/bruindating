import { useState } from 'react';
import { Avatar, Button, Paper, Text } from '@mantine/core';


export function UserInfoAction() {
    const [pfp, setPfp] = useState("https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png")

    function buttonHandle(){
        // command to get user input 
    }

  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar
        src={pfp}
        size={120}
        radius={120}
        mx="auto"
      />

      <Button variant="default" fullWidth mt="md">
        Change profile picture
      </Button>
    </Paper>
  );
}