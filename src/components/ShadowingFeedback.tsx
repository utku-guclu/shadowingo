import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface Props {
  accuracy: number;
  pronunciation: number;
  timing: number;
}

export const ShadowingFeedback = ({
  accuracy,
  pronunciation,
  timing,
}: Props) => {
  return (
    <View style={styles.container} testID="feedback-container">
      <View style={styles.metricContainer}>
        <Text style={styles.label}>Accuracy</Text>
        <Text style={[styles.value, { color: getColorForScore(accuracy) }]}>
          {accuracy}%
        </Text>
      </View>

      <View style={styles.metricContainer}>
        <Text style={styles.label}>Pronunciation</Text>
        <Text
          style={[styles.value, { color: getColorForScore(pronunciation) }]}
        >
          {pronunciation}%
        </Text>
      </View>

      <View style={styles.metricContainer}>
        <Text style={styles.label}>Timing</Text>
        <Text style={[styles.value, { color: getColorForScore(timing) }]}>
          {timing}%
        </Text>
      </View>
    </View>
  );
};

const getColorForScore = (score: number): string => {
  if (score >= 90) return "#4CAF50";
  if (score >= 70) return "#FFC107";
  return "#F44336";
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  metricContainer: {
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
