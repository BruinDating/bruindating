"use client";

import {
  Card,
  CardSection,
  Center,
  ActionIcon,
  Flex,
  Transition,
  MantineTransition,
} from "@mantine/core";
import {
  IconRotateClockwise,
  IconX,
  IconStar,
  IconHeart,
  IconBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import SwipingCarousel from "@/components/SwipingCarousel/SwipingCarousel";
import { useState } from "react";

import placeholder1 from "@/media/placeholders/placeholder1.webp";
import placeholder2 from "@/media/placeholders/placeholder2.webp";
import placeholder3 from "@/media/placeholders/placeholder3.webp";
import placeholder4 from "@/media/placeholders/placeholder4.webp";

const images1 = [placeholder1, placeholder2];
const images2 = [placeholder3, placeholder4];
const images = [images1, images2];

const Home = () => {
  const [opened, setOpened] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const [transition, setTransition] =
    useState<MantineTransition>("pop-top-right");
  const [scale, setScale] = useState(1);

  return (
    <motion.div animate={{ scale: scale }}>
      <Transition mounted={opened} transition={transition} duration={400}>
        {(styles) => (
          <Center h="100vh" px="xl" style={styles}>
            <Card
              w={600}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ backgroundColor: "#EEEEEE" }}
            >
              <CardSection>
                <SwipingCarousel images={images[imgIndex]} />
              </CardSection>
              <Flex justify="space-between" p="xl">
                <ActionIcon
                  size="xl"
                  color="yellow"
                  variant="transparent"
                  onClick={() => {
                    if (imgIndex > 0) {
                      setOpened(false);
                      setTimeout(() => {
                        setImgIndex(imgIndex - 1);
                        setOpened(true);
                      }, 500);
                    }
                  }}
                >
                  <IconRotateClockwise size={48} />
                </ActionIcon>
                <ActionIcon
                  size="xl"
                  color="red"
                  variant="transparent"
                  onClick={() => {
                    setTransition("rotate-left");
                    setOpened(false);
                    if (imgIndex < images.length - 1)
                      setTimeout(() => {
                        setImgIndex(imgIndex + 1);
                        setOpened(true);
                      }, 500);
                  }}
                >
                  <IconX size={48} />
                </ActionIcon>
                <ActionIcon
                  size="xl"
                  variant="transparent"
                  onClick={() => {
                    setScale(1.2);
                    setTimeout(() => {
                      setScale(1);
                      setTransition("pop");
                      setOpened(false);
                    }, 1000);
                    if (imgIndex < images.length - 1)
                      setTimeout(() => {
                        setImgIndex(imgIndex + 1);
                        setOpened(true);
                      }, 1200);
                  }}
                >
                  <IconStar size={48} />
                </ActionIcon>
                <ActionIcon
                  size="xl"
                  color="teal"
                  variant="transparent"
                  onClick={() => {
                    setTransition("rotate-right");
                    setOpened(false);
                    if (imgIndex < images.length - 1)
                      setTimeout(() => {
                        setImgIndex(imgIndex + 1);
                        setOpened(true);
                      }, 500);
                  }}
                >
                  <IconHeart size={48} />
                </ActionIcon>
                <ActionIcon size="xl" color="violet" variant="transparent">
                  <IconBolt size={48} />
                </ActionIcon>
              </Flex>
            </Card>
          </Center>
        )}
      </Transition>
    </motion.div>
  );
};

export default Home;
