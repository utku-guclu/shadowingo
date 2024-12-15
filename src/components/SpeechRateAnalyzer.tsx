import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  targetRate: number;
  userRate: number;
  difference: number;
}

export const SpeechRateAnalyzer = ({
  targetRate,
  userRate,
  difference,
}: Props) => {
  const getRateStatus = () => {
    if (Math.abs(difference) <= 10) return "Perfect!";
    return difference > 0 ? "Speak faster" : "Slow down";
  };

  return (
    <View style={styles.container} testID="speech-rate-analyzer">
      <View style={styles.rateDisplay}>
        <View style={styles.rateBox}>
          <Text style={styles.rateValue}>{targetRate}</Text>
          <Text style={styles.rateLabel}>Target WPM</Text>
        </View>

        <View style={styles.rateBox}>
          <Text style={styles.rateValue}>{userRate}</Text>
          <Text style={styles.rateLabel}>Your WPM</Text>
        </View>
      </View>

      <Text
        style={[
          styles.feedback,
          { color: Math.abs(difference) <= 10 ? "#4CAF50" : "#FF9800" },
        ]}
      >
        {getRateStatus()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  rateDisplay: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  rateBox: {
    alignItems: "center",
  },
  rateValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2196F3",
  },
  rateLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  feedback: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
});
