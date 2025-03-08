import {
  Divider,
  Grid,
  GridCol,
  Paper,
  TabsPanel,
  Title,
  Text,
} from "@mantine/core";
import { UserData } from "@/types/types";

const About = ({ userData }: { userData: UserData }) => {
  return (
    <TabsPanel value="about">
      <Paper p="md" shadow="xs" radius="md" withBorder>
        <Title order={4} mb="sm">
          Bio
        </Title>
        <Text>{userData.bio}</Text>

        <Divider my="md" />

        <Title order={4} mb="sm">
          Basic Information
        </Title>
        <Grid>
          <GridCol span={6}>
            <Text fw={500}>Age:</Text>
            <Text>{userData.age}</Text>
          </GridCol>
          <GridCol span={6}>
            <Text fw={500}>Major:</Text>
            <Text>{userData.major}</Text>
          </GridCol>
          <GridCol span={6}>
            <Text fw={500}>Year:</Text>
            <Text>{userData.year}</Text>
          </GridCol>
        </Grid>
      </Paper>
    </TabsPanel>
  );
};

export default About;
