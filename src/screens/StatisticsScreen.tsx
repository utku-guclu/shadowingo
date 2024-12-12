import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StorageService } from "../services/storage.service";
import { User } from "../types/user";

export const StatisticsScreen = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    const userData = await StorageService.getUser();
    setUser(userData);
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Text style={styles.title}>Your Progress</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {user.statistics.totalSessions}
              </Text>
              <Text style={styles.statLabel}>Total Sessions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {user.statistics.averageScore}%
              </Text>
              <Text style={styles.statLabel}>Average Score</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2196F3",
  },
  statLabel: {
    fontSize: 16,
    color: "#666",
  },
});
