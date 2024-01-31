import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  createTheme,
} from "@mantine/core";
import {
  IconGauge,
  IconUser,
  IconCookie,
  IconSearch,
  IconChartLine,
  IconFriends,
} from "@tabler/icons-react";
import "./FeatureCard.css";
import React from "react";

const mockdata = [
  {
    title: "analyze your stats",
    description:
      "Most New Year's resolutions don't go as planned ... keep yourself accountable by logging your progress and achieving your reading milestones.",
    icon: IconChartLine,
  },
  {
    title: "discover new books",
    description:
      "Bored? bookblendr can recommend you a book that you'll love to diversify your knowledge and spark your creativity.",
    icon: IconSearch,
  },
  {
    title: "create blends",
    description:
      "Get the best of both worlds when you blend with a friend. Find where your interests intersect and work towards your reading goals together.",
    icon: IconFriends,
  },
];

export function FeaturesCards() {
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className="Feature-card" padding="xl">
      <feature.icon style={{ width: rem(50), height: rem(50) }} stroke={2} color={"#DAA5A4"} />
      <Text fz="lg" fw={500} className="Feature-cardTitle" mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Keep reading
        </Badge>
      </Group>

      <Title order={2} className="Feature-title" ta="center" mt="sm">
        track your favorite books and blend your tastes with friends
      </Title>

      <Text c="dimmed" className="Feature-description" ta="center" mt="md">
        Every once in a while, you’ll find a book that deserves to be read, reread, and shared. Use
        bookblendr to keep a history of your media, from classics to fresh finds.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
