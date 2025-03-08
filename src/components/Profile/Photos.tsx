import {
  TabsPanel,
  Paper,
  Group,
  Title,
  Button,
  Grid,
  GridCol,
  Card,
  CardSection,
  ActionIcon,
  Text,
  Image,
} from "@mantine/core";
import { IconCamera, IconEdit } from "@tabler/icons-react";
import { UserData } from "@/types/types";

const Photos = ({ userData }: { userData: UserData }) => {
  return (
    <TabsPanel value="photos">
      <Paper p="md" shadow="xs" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Photos</Title>
          <Button
            leftSection={<IconCamera size={16} />}
            variant="light"
            size="sm"
          >
            Add Photo
          </Button>
        </Group>

        <Grid>
          {userData.photos.map((photo, index) => (
            <GridCol span={{ base: 12, sm: 6, md: 3 }} key={index}>
              <Card shadow="sm" padding="xs" radius="md" withBorder>
                <CardSection>
                  <Image src={photo} height={160} alt={`Photo ${index + 1}`} />
                </CardSection>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Photo {index + 1}</Text>
                  <ActionIcon variant="subtle" color="red">
                    <IconEdit size={16} />
                  </ActionIcon>
                </Group>
              </Card>
            </GridCol>
          ))}
        </Grid>
      </Paper>
    </TabsPanel>
  );
};

export default Photos;
