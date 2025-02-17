import { Card, CardSection, Center, ActionIcon, Flex } from "@mantine/core";
import {
  IconRotateClockwise,
  IconX,
  IconStar,
  IconHeart,
  IconBolt,
} from "@tabler/icons-react";
import SwipingCarousel from "@/components/SwipingCarousel/SwipingCarousel";

const Home = () => {
  return (
    <Center h="100vh" px="xl">
      <Card
        w={600}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ backgroundColor: "#EEEEEE" }}
      >
        <CardSection>
          <SwipingCarousel />
        </CardSection>
        <Flex justify="space-between" p="xl">
          <ActionIcon
            radius="xl"
            size="xl"
            color="yellow"
            variant="transparent"
          >
            <IconRotateClockwise size="xl" />
          </ActionIcon>
          <ActionIcon size="xl" color="red" variant="transparent">
            <IconX size="xl" />
          </ActionIcon>
          <ActionIcon size="xl" variant="transparent">
            <IconStar size="xl" />
          </ActionIcon>
          <ActionIcon size="xl" color="teal" variant="transparent">
            <IconHeart size="xl" />
          </ActionIcon>
          <ActionIcon size="xl" color="violet" variant="transparent">
            <IconBolt size="xl" />
          </ActionIcon>
        </Flex>
      </Card>
    </Center>
  );
};

export default Home;
