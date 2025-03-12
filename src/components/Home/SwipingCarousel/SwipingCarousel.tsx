"use client";

import "@mantine/carousel/styles.css";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import { Box } from "@mantine/core";

interface SwipingCarouselProps {
  images: string[];
}

const SwipingCarousel = ({ images }: SwipingCarouselProps) => {
  const getImageUrl = (image: string) => {
    if (image.startsWith('http')) {
      return image;
    }
    // if relative path starting with /media, prepend the backend URL
    if (image.startsWith('/media')) {
      return `http://127.0.0.1:8000${image}`;
    }
  
    return image;
  };

  return (
    <Carousel
      withIndicators
      height={400}
      dragFree
      slideGap="md"
      align="start"
    >
      {images.map((image, index) => (
        <Carousel.Slide key={index}>
          <Box h={400} style={{ position: 'relative' }}>
            <Image
              src={getImageUrl(image)}
              alt={`Profile image ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              unoptimized={image.startsWith('http')}
            />
          </Box>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default SwipingCarousel;
