import {
  Divider,
  Grid,
  GridCol,
  Paper,
  TabsPanel,
  Title,
  Text,
} from "@mantine/core";
import { profileDataProps } from "@/types/types";

const About = ({ profileData }: { profileData: profileDataProps }) => {
  return (
    <TabsPanel value="about">
      <Paper p="md" shadow="xs" radius="md" withBorder>
        <Title order={4} mb="sm">
          Bio
        </Title>
        <Text>{profileData.bio}</Text>

        <Divider my="md" />

        <Title order={4} mb="sm">
          Basic Information
        </Title>
        <Grid>
          <GridCol span={6}>
            <Text fw={500}>Age:</Text>
            <Text>{profileData.age}</Text>
          </GridCol>
          <GridCol span={6}>
            <Text fw={500}>Major:</Text>
            <Text>{profileData.major}</Text>
          </GridCol>
          <GridCol span={6}>
            <Text fw={500}>Year:</Text>
            <Text>{profileData.year}</Text>
          </GridCol>
        </Grid>
      </Paper>
    </TabsPanel>
  );
};

export default About;
