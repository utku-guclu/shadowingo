import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StorageService } from "../services/storage.service";
import { User } from "../types/user";

export const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    const userData = await StorageService.getUser();
    setUser(userData);
  };

  return (
    <View style={styles.container} testID="profile-container">
      {user && (
        <>
          <View style={styles.header}>
            <Image
              style={styles.avatar}
              source={{
                uri:
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${user.username}`,
              }}
            />
            <Text style={styles.username}>{user.username}</Text>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Your Progress</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {user.statistics.totalSessions}
                </Text>
                <Text style={styles.statLabel}>Sessions</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {user.statistics.averageScore}%
                </Text>
                <Text style={styles.statLabel}>Avg. Score</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statsContainer: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2196F3",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
});
