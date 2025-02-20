import { Card, Title, Divider, Text } from "@mantine/core";

const FamilyInfo = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt="md" style={{ backgroundColor: "#f8f9fa" }}>
      <Title order={4}>Family Info</Title>
      <Divider my="sm" />
      <Text fw={500}>Father</Text>
      <Text size="sm" color="#6c757d">Name: Rayz Quraishi</Text>
      <Text size="sm" color="#6c757d">Profession: Police Officer</Text>

      <Divider my="sm" />
      <Text fw={500}>Mother</Text>
      <Text size="sm" color="#6c757d">Name: Ariba Quraishi</Text>
      <Text size="sm" color="#6c757d">Profession: Doctor</Text>
    </Card>
  );
};

export default FamilyInfo;
