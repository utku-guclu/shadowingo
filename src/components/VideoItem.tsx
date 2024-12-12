import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import { Video } from "../types/video";

interface Props {
  video: Video;
  onSelect: () => void;
}

export const VideoItem = ({ video, onSelect }: Props) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={styles.container}
      testID="video-item"
    >
      <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {video.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  thumbnail: {
    width: 120,
    height: 70,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});
