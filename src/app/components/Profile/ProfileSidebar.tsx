import { Card, CardSection, Image, Title, Text, Flex, Button, ActionIcon, Box } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";


const ProfileSidebar = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: "#f8f9fa" }}>
      {/* Top Section - Upgrade Profile & Edit Icon */}
      <Flex justify="space-between" align="center" mb="sm">
        <Button size="sm" color="teal" radius="md">
          Upgrade profile
        </Button>
        <ActionIcon variant="light" color="red">
          <IconEdit size={18} />
        </ActionIcon>
      </Flex>

      {/* Profile Picture */}
      <CardSection>
        <Image
          src="/images/IMG_8536.jpg"
          alt="Profile avatar"
          height={325}
          radius="100%"
          style={{ display: "block", margin: "auto" }}
        />
      </CardSection>

      {/* Profile Info */}
      <Box mt="md">
        <Title order={4} style={{ textAlign: "center" }}>
          XiaoJin Zuo
        </Title>

        <Text size="sm" style={{ textAlign: "center", color: "#6c757d", marginBottom: "10px" }}>
          Ethiopa, Africa
        </Text>

        {/* Profile Details */}
        <Box mt="sm">
          <Text style={{ fontWeight: 600 }}>Name</Text>
          <Text size="sm" mb="sm" color="#6c757d">Alden Do</Text>

          <Text style={{ fontWeight: 600 }}>Country</Text>
          <Text size="sm" mb="sm" color="#6c757d">Africa</Text>

          <Text style={{ fontWeight: 600 }}>Age</Text>
          <Text size="sm" mb="sm" color="#6c757d">13</Text>

          <Text style={{ fontWeight: 600 }}>Height</Text>
          <Text size="sm" mb="sm" color="#6c757d">6'9</Text>

          <Text style={{ fontWeight: 600 }}>Religion</Text>
          <Text size="sm" style={{ color: "#6c757d" }} mb="sm">
            Christian
          </Text>

          <Text style={{ fontWeight: 600 }}>Civil Status</Text>
          <Text size="sm" style={{ color: "#6c757d" }} mb="sm">
            Single
          </Text>

          <Text style={{ fontWeight: 600 }}>Profession</Text>
          <Text size="sm" style={{ color: "#6c757d" }} mb="sm">
            Photographer
          </Text>
        </Box>
      </Box>

      {/* Hide Proposal Button */}
      <Button fullWidth mt="md" color="red" radius="md">
        Hide proposal
      </Button>
    </Card>
  );
};

export default ProfileSidebar;
