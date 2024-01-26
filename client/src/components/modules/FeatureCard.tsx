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
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
    icon: IconChartLine,
  },
  {
    title: "discover new books",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
    icon: IconSearch,
  },
  {
    title: "create blends",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
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
        Track your favorite books and blend your tastes with friends
      </Title>

      <Text c="dimmed" className="Feature-description" ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
        hunger drives it to try biting a Steel-type Pokémon.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
