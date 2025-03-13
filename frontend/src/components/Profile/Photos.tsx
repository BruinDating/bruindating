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
import { profileDataProps } from "@/types/types";

const Photos = ({ profileData }: { profileData: profileDataProps }) => {
  const validPhotos = profileData.photos.filter(
    (photo) => photo && photo !== ""
  );

  return (
    <TabsPanel value="photos">
      <Paper p="md" shadow="xs" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Photos</Title>
        </Group>

        {validPhotos.length > 0 ? (
          <Grid>
            {validPhotos.map((photo, index) => (
              <GridCol span={{ base: 12, sm: 6, md: 3 }} key={index}>
                <Card shadow="sm" padding="xs" radius="md" withBorder>
                  <CardSection>
                    <Image
                      src={photo}
                      height={160}
                      alt={`Photo ${index + 1}`}
                    />
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
        ) : (
          <Text c="dimmed" ta="center" py="xl">
            No photos available. Add some photos to showcase your profile!
          </Text>
        )}
      </Paper>
    </TabsPanel>
  );
};

export default Photos;
