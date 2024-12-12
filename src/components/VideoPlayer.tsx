import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Video } from "../types/video";

interface Props {
  video: Video;
  onReady?: () => void;
  onStateChange?: (state: string) => void;
}

export const VideoPlayer = ({ video, onReady, onStateChange }: Props) => {
  return (
    <View style={styles.container} testID="video-player">
      <YoutubePlayer
        height={height}
        videoId={video.id}
        onReady={onReady}
        onChangeState={onStateChange}
      />
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.3,
  },
});
