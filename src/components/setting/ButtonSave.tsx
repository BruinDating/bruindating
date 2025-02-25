import { IconCheck, IconDeviceFloppy } from '@tabler/icons-react';
import { Button, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles.css';


type ButtonCopyProps = {
    hand: () => void; // Function with no arguments and no return value
  };

export function ButtonCopy({ hand }: ButtonCopyProps) {
  const clipboard = useClipboard();
  function handle(){
    {clipboard.copy("")};
    {hand()};
  }
  return (
    <Tooltip
      label="Changes Saved!"
      offset={5}
      position="bottom"
      radius="xl"
      transitionProps={{ duration: 100, transition: 'slide-down' }}
      opened={clipboard.copied}
    >
      <Button
        variant="light"
        rightSection={
          clipboard.copied ? (
            <IconCheck size={20} stroke={1.5} />
          ) : (
            <IconDeviceFloppy size={20} stroke={1.5} />
          )
        }
        radius="xl"
        size="md"
        pr={14}
        h={48}
        styles={{ section: { marginLeft: 22 } }}
        onClick={handle}
      >
        Save Changes
      </Button>
    </Tooltip>
  );
}