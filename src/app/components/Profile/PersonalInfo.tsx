import { Card, Title, Divider, Text } from "@mantine/core";

const PersonalInfo = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt="md" style={{ backgroundColor: "#f8f9fa" }}>
      <Title order={4}>Personal Info</Title>
      <Divider my="sm" />
      <Text fw={500}>Education</Text>
      <Text size="sm" color="#6c757d">University: University of Alberta</Text>
      <Text size="sm" color="#6c757d">Degree: Mechanical Engineering</Text>
      <Text size="sm" color="#6c757d">Graduation: Complete</Text>

      <Divider my="sm" />
      <Text fw={500}>Habits</Text>
      <Text size="sm" color="#6c757d">Drinking: Monthly</Text>
      <Text size="sm" color="#6c757d">Smoking: No</Text>
      <Text size="sm" color="#6c757d">Food Preference: Vegetarian</Text>
    </Card>
  );
};

export default PersonalInfo;
