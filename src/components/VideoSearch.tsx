import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { YouTubeService } from "../services/youtube.service";

export const VideoSearch = ({ onResultsFound }: any) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.length >= 3) {
      const results = await YouTubeService.searchVideos(text);
      onResultsFound(results);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        testID="search-input"
        style={styles.input}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search videos..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
