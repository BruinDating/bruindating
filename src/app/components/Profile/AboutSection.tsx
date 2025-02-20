import { Card, Title, Text, ScrollArea } from "@mantine/core";

const AboutSection = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt="md" style={{ backgroundColor: "#f8f9fa" }}>
      <Title order={4}>About</Title>
      <ScrollArea style={{ maxHeight: 150 }}>
        <Text size="sm" color="#6c757d" style={{ textAlign: "center" }}>
          Buddhist son is sought by B/G parents from Colombo. The proposed daughter is 25 years old, 5'3" in height, 
          pretty, very fair and well-mannered.
        </Text>
      </ScrollArea>
    </Card>
  );
};

export default AboutSection;
