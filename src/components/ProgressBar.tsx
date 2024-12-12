import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
  progress: number;
  duration: number;
}

export const ProgressBar = ({ progress, duration }: Props) => {
  const progressWidth = (progress / duration) * 100;

  return (
    <View style={styles.container} testID="progress-bar">
      <View
        style={[styles.progress, { width: `${progressWidth}%` }]}
        testID="progress-indicator"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: "#ddd",
    width: "100%",
  },
  progress: {
    height: "100%",
    backgroundColor: "#2196F3",
  },
});
