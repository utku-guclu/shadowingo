import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
}

interface Props {
  goals: Goal[];
  onGoalPress: (goalId: string) => void;
}

export const PracticeGoals = ({ goals, onGoalPress }: Props) => {
  return (
    <View style={styles.container} testID="goals-container">
      {goals.map((goal) => (
        <TouchableOpacity
          key={goal.id}
          style={styles.goalCard}
          onPress={() => onGoalPress(goal.id)}
          testID={`goal-${goal.id}`}
        >
          <Text style={styles.title}>{goal.title}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progress,
                  { width: `${(goal.current / goal.target) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {goal.current}/{goal.target} {goal.unit}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  goalCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    marginRight: 12,
  },
  progress: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    minWidth: 80,
    textAlign: "right",
  },
});
