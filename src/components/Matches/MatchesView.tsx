"use client";

import { SimpleGrid, Text, Select, Group, Center } from "@mantine/core";
import { useState } from "react";
import { MatchData, SortOption } from "@/types/types";
import MatchCard from "./MatchCard";

const MatchesView = ({
  data,
  isPotential = false,
}: {
  data: MatchData[];
  isPotential?: boolean;
}) => {
  const [sortBy, setSortBy] = useState<string | null>("name");

  if (data.length === 0) {
    return (
      <Center>
        {isPotential ? (
          <Text c="dimmed">You don't have any match requests!</Text>
        ) : (
          <Text c="dimmed">
            You don't have any matches yet. Start swiping to find matches!
          </Text>
        )}
      </Center>
    );
  }

  const sortedMatches = [...data].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "major") {
      return a.major.localeCompare(b.major);
    }
    return 0;
  });

  const sortOptions: SortOption[] = [
    { value: "name", label: "Name" },
    { value: "major", label: "Major" },
  ];

  return (
    <>
      <Group justify="flex-end" mb="md">
        <Select
          label="Sort by"
          value={sortBy}
          onChange={setSortBy}
          data={sortOptions}
          w={200}
        />
      </Group>
      <SimpleGrid cols={7} spacing="xl">
        {isPotential
          ? sortedMatches.map((match) => (
              <MatchCard key={match.username} match={match} isPotential />
            ))
          : sortedMatches.map((match) => (
              <MatchCard key={match.username} match={match} />
            ))}
      </SimpleGrid>
    </>
  );
};

export default MatchesView;
