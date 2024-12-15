import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { format } from "date-fns";

interface PracticeSession {
  id: string;
  date: Date;
  videoTitle: string;
  score: number;
  duration: number;
}

interface Props {
  sessions: PracticeSession[];
}

export const PracticeHistory = ({ sessions }: Props) => {
  const renderItem = ({ item }: { item: PracticeSession }) => (
    <View style={styles.sessionItem} testID="session-item">
      <Text style={styles.title}>{item.videoTitle}</Text>
      <View style={styles.details}>
        <Text style={styles.date}>{format(item.date, "MMM dd, yyyy")}</Text>
        <Text style={styles.score}>{item.score}%</Text>
        <Text style={styles.duration}>{Math.round(item.duration / 60)}min</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container} testID="history-container">
      <FlatList
        data={sessions}
        renderItem={renderItem}
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
  sessionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: "#666",
  },
  score: {
    color: "#2196F3",
    fontWeight: "bold",
  },
  duration: {
    color: "#666",
  },
});
