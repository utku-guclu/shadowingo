import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Difficulty = "beginner" | "intermediate" | "advanced";

interface Props {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

export const DifficultySelector = ({ selected, onSelect }: Props) => {
  return (
    <View style={styles.container} testID="difficulty-selector">
      {(["beginner", "intermediate", "advanced"] as Difficulty[]).map(
        (level) => (
          <TouchableOpacity
            key={level}
            style={[styles.button, selected === level && styles.selectedButton]}
            onPress={() => onSelect(level)}
            testID={`difficulty-${level}`}
          >
            <Text
              style={[
                styles.buttonText,
                selected === level && styles.selectedText,
              ]}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    margin: 4,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    fontSize: 14,
    color: "#666",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
