import { Card, CardSection, Image, Title, Grid, Text } from "@mantine/core";

const media = [
  { url: "/images/IMG_8538.jpg", title: "Photo 1" },
  { url: "/images/IMG_8536.jpg", title: "Photo 2" },
];

const MediaSection = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: "#f8f9fa" }}>
      <Title order={4}>Media</Title>
      <Grid>
        {media.map((item, index) => (
          <Grid.Col key={index} span={{ md: 6 }}>
            <Card shadow="sm" radius="md">
              <CardSection>
                <Image src={item.url} alt={item.title} height={150} />
              </CardSection>
              <Text style={{ textAlign: "center" }} mt="sm">
                {item.title}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Card>
  );
};

export default MediaSection;
