import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { StorageService } from "../services/storage.service";
import { User } from "../types/user";

export const OnboardingScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      createdAt: new Date().toISOString(),
      statistics: {
        totalSessions: 0,
        averageScore: 0,
      },
    };

    await StorageService.saveUser(newUser);
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />
      <Button title="Get Started" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
