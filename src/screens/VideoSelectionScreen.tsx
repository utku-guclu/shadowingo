import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { YouTubeService, VideoDetails } from "../services/youtube.service";

export const VideoSelectionScreen = ({ navigation }: any) => {
  const [videos, setVideos] = useState<VideoDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    const results = await YouTubeService.searchVideos(searchQuery);
    setVideos(results);
  };

  const handleVideoSelect = (video: VideoDetails) => {
    navigation.navigate("ShadowingSession", { video });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        placeholder="Search videos..."
      />
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoItem}
            onPress={() => handleVideoSelect(item)}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  videoItem: {
    marginBottom: 10,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
});
