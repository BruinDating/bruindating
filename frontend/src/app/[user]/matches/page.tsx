"use client";

import { useEffect, useState } from "react";
import MatchesView from "@/components/Matches/MatchesView";
import { Tabs, Loader, Center, Text } from "@mantine/core";
import { fetchCurrentMatches, fetchPotentialMatches } from "@/services/api";
import { useAuth } from "@/components/Auth/AuthContext";
import { MatchData } from "@/types/types";

const Matches = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentMatches, setCurrentMatches] = useState<MatchData[]>([]);
  const [potentialMatches, setPotentialMatches] = useState<MatchData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMatches = async () => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);
      setError(null);

      const accessToken = localStorage.getItem("access_token");
      const [current, potential] = await Promise.all([
        fetchCurrentMatches(accessToken),
        fetchPotentialMatches(accessToken),
      ]);

      setCurrentMatches(current);
      setPotentialMatches(potential);
    } catch (err) {
      setError("Failed to load matches. Please try again later.");
      console.error("Error loading matches:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <Center h="50vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="50vh">
        <Text c="red">{error}</Text>
      </Center>
    );
  }

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
        <MatchesView data={potentialMatches} isPotential onMatchSuccess={loadMatches} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Matches;
