import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: Date;
}

export const StreakTracker = ({
  currentStreak,
  longestStreak,
  lastPracticeDate,
}: Props) => {
  const today = new Date();
  const isActiveToday =
    lastPracticeDate.toDateString() === today.toDateString();

  return (
    <View style={styles.container} testID="streak-tracker">
      <View style={styles.streakBox}>
        <Text style={styles.streakNumber}>{currentStreak}</Text>
        <Text style={styles.streakLabel}>Current Streak</Text>
        {isActiveToday && (
          <Text style={styles.activeToday}>🔥 Active today!</Text>
        )}
      </View>

      <View style={styles.streakBox}>
        <Text style={styles.streakNumber}>{longestStreak}</Text>
        <Text style={styles.streakLabel}>Longest Streak</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  streakBox: {
    alignItems: "center",
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF5722",
  },
  streakLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  activeToday: {
    color: "#4CAF50",
    marginTop: 8,
    fontWeight: "500",
  },
});
