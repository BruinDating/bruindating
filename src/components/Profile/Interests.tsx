import { TabsPanel, Paper, Title, Flex, Badge } from "@mantine/core";
import { UserData } from "@/types/types";

const Interests = ({ userData }: { userData: UserData }) => {
  return (
    <TabsPanel value="interests">
      <Paper p="md" shadow="xs" radius="md" withBorder>
        <Title order={4} mb="md">
          Interests
        </Title>
        <Flex gap="md" wrap="wrap">
          {userData.interests.map((interest, index) => (
            <Badge size="lg" key={index} color="blue" variant="light">
              {interest}
            </Badge>
          ))}
        </Flex>
      </Paper>
    </TabsPanel>
  );
};

export default Interests;
