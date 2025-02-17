import "@mantine/carousel/styles.css";
import Image from "next/image";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import placeholder1 from "@/media/placeholders/placeholder1.webp";
import placeholder2 from "@/media/placeholders/placeholder2.webp";

const images = [placeholder1, placeholder2];

const SwipingCarousel = () => {
  const slides = images.map((img, i) => (
    <CarouselSlide key={i}>
      <Image src={img} fill alt="profile photo" />
    </CarouselSlide>
  ));

  return (
    <Carousel slideSize="100%" height={800} withIndicators>
      {slides}
    </Carousel>
  );
};

export default SwipingCarousel;
