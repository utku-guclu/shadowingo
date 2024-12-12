import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  text: string;
  isHighlighted?: boolean;
}

export const SubtitleDisplay = ({ text, isHighlighted = false }: Props) => {
  return (
    <View style={styles.container} testID="subtitle-container">
      <Text
        style={[styles.text, isHighlighted && styles.highlighted]}
        testID="subtitle-text"
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  highlighted: {
    backgroundColor: "#2196F3",
    padding: 4,
    borderRadius: 4,
  },
});
