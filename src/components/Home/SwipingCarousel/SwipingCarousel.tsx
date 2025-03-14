"use client";

import "@mantine/carousel/styles.css";
import Image from "next/image";
import {
  Carousel,
  CarouselSlide,
  Embla,
  useAnimationOffsetEffect,
} from "@mantine/carousel";
import { useState } from "react";
import { Flex, Stack, Text } from "@mantine/core";
import { SwipingCarouselProps } from "@/types/types";

const SwipingCarousel = ({
  images,
  name,
  age,
  major,
  bio,
}: SwipingCarouselProps) => {
  const slides = images.map((img, i) => (
    <CarouselSlide key={i}>
      <Image src={img} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="profile photo" />
    </CarouselSlide>
  ));
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, 400);

  return (
    <>
      <Carousel
        getEmblaApi={setEmbla}
        key={JSON.stringify(images)}
        height={450}
        withIndicators
        loop
      >
        {slides}
      </Carousel>
      <Stack style={{ backgroundColor: "#EEEEEE" }} p="lg">
        <Flex gap={5}>
          <Text>{name},</Text>
          <Text>Age: {age}</Text>
        </Flex>
        <Text>Major: {major}</Text>
        <Text>{bio}</Text>
      </Stack>
    </>
  );
};

export default SwipingCarousel;
