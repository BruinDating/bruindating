"use client";

import "@mantine/carousel/styles.css";
import Image, { StaticImageData } from "next/image";
import {
  Carousel,
  CarouselSlide,
  Embla,
  useAnimationOffsetEffect,
} from "@mantine/carousel";
import { useState } from "react";

const SwipingCarousel = ({ images }: { images: StaticImageData[] }) => {
  const slides = images.map((img, i) => (
    <CarouselSlide key={i}>
      <Image src={img} fill alt="profile photo" />
    </CarouselSlide>
  ));
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, 400);

  return (
    <Carousel
      getEmblaApi={setEmbla}
      key={JSON.stringify(images)}
      height={800}
      withIndicators
      loop
    >
      {slides}
    </Carousel>
  );
};

export default SwipingCarousel;
