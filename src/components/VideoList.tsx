import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { VideoItem } from "./VideoItem";
import { Video } from "../types/video";

interface Props {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

export const VideoList = ({ videos, onVideoSelect }: Props) => {
  return (
    <FlatList
      testID="video-list"
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <VideoItem video={item} onSelect={() => onVideoSelect(item)} />
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
