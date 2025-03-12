"use client";

import MatchesView from "@/components/Matches/MatchesView";
import { potentialMatches, currentMatches } from "@/mockData/matchesData";
import { Tabs } from "@mantine/core";

const Matches = () => {
  return (
    <Tabs defaultValue="current">
      <Tabs.List>
        <Tabs.Tab value="current">Current Matches</Tabs.Tab>
        <Tabs.Tab value="potential">Potential Matches</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="current" pt="md">
        <MatchesView data={currentMatches} />
      </Tabs.Panel>

      <Tabs.Panel value="potential" pt="md">
        <MatchesView data={potentialMatches} isPotential />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Matches;
