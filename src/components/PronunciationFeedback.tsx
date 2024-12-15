import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface Props {
  word: string;
  accuracy: number;
  phonemes: {
    symbol: string;
    score: number;
  }[];
}

export const PronunciationFeedback = ({ word, accuracy, phonemes }: Props) => {
  return (
    <View style={styles.container} testID="pronunciation-feedback">
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.accuracy}>{accuracy}% Accurate</Text>

      <View style={styles.phonemesContainer}>
        {phonemes.map((phoneme, index) => (
          <View key={index} style={styles.phonemeCard}>
            <Text style={styles.phonemeSymbol}>{phoneme.symbol}</Text>
            <View style={styles.scoreBar}>
              <Animated.View
                style={[styles.scoreIndicator, { width: `${phoneme.score}%` }]}
              />
            </View>
          </View>
        ))}
      </View>
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
  word: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  accuracy: {
    fontSize: 18,
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 16,
  },
  phonemesContainer: {
    gap: 8,
  },
  phonemeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  phonemeSymbol: {
    width: 40,
    fontSize: 16,
    fontWeight: "500",
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  scoreIndicator: {
    height: "100%",
    backgroundColor: "#2196F3",
    borderRadius: 4,
  },
});
