import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
}

interface Props {
  achievements: Achievement[];
}

export const Achievements = ({ achievements }: Props) => {
  const renderAchievement = ({ item }: { item: Achievement }) => (
    <View style={styles.achievementCard} testID="achievement-item">
      <Image source={{ uri: item.icon }} style={styles.icon} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${item.progress}%` }]} />
        </View>
      </View>
      {item.unlocked && (
        <View style={styles.unlockedBadge}>
          <Text style={styles.unlockedText}>✓</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container} testID="achievements-container">
      <FlatList
        data={achievements}
        renderItem={renderAchievement}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  achievementCard: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "#666",
    marginTop: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#eee",
    marginTop: 8,
    borderRadius: 2,
  },
  progress: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 2,
  },
  unlockedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  unlockedText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
