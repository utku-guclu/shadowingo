import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  isPlaying: boolean;
  onPlayPause: () => void;
  onRewind: () => void;
  onForward: () => void;
}

export const VideoControls = ({
  isPlaying,
  onPlayPause,
  onRewind,
  onForward,
}: Props) => {
  return (
    <View style={styles.container} testID="video-controls">
      <TouchableOpacity onPress={onRewind} testID="rewind-button">
        <Text style={styles.controlText}>-10s</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPlayPause} testID="play-pause-button">
        <Text style={styles.controlText}>{isPlaying ? "⏸️" : "▶️"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onForward} testID="forward-button">
        <Text style={styles.controlText}>+10s</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  controlText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
