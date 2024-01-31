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
      "Get an in-depth analysis of your preferences as a reader and track your reading progress over time.",
    icon: IconChartLine,
  },
  {
    title: "create blends",
    description:
      "Send your custom blend link to a friend to see where your interests intersect.",
    icon: IconFriends,
  },
  {
    title: "find your next read",
    description:
      "Embark on your literary journey with friends by discovering books that resonate with both of you.",
    icon: IconSearch,
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
          the Axolotl intelligence (AI)-powered personal reading experience
        </Badge>
      </Group>

      <Title order={2} className="Feature-title" ta="center" mt="sm">
        track your favorite books and blend your tastes with friends
      </Title>

      <Text c="dimmed" className="Feature-description" ta="center" mt="md">
        Every once in a while, you’ll find a book that deserves to be read, reread, and shared. Use
        booksalotl to keep a history of your media, from classics to fresh finds.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
