import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Stats {
  totalPracticeTime: number;
  averageScore: number;
  sessionsCompleted: number;
  perfectScores: number;
}

interface Props {
  stats: Stats;
}

export const StatsDashboard = ({ stats }: Props) => {
  return (
    <View style={styles.container} testID="stats-dashboard">
      <View style={styles.statCard}>
        <Text style={styles.statValue}>
          {Math.round(stats.totalPracticeTime / 3600)}h
        </Text>
        <Text style={styles.statLabel}>Total Practice</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statValue}>{stats.averageScore}%</Text>
        <Text style={styles.statLabel}>Avg Score</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statValue}>{stats.sessionsCompleted}</Text>
        <Text style={styles.statLabel}>Sessions</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statValue}>{stats.perfectScores}</Text>
        <Text style={styles.statLabel}>Perfect Scores</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },
  statCard: {
    width: "50%",
    padding: 8,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2196F3",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
