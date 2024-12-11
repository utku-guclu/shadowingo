import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { SpeechService } from "../services/speech.service";
import { VideoDetails } from "../services/youtube.service";

interface Props {
  route: {
    params: {
      video: VideoDetails;
    };
  };
}

export const ShadowingSession = ({ route }: Props) => {
  const [transcription, setTranscription] = useState("");
  const [userSpeech, setUserSpeech] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const { video } = route.params;

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    if (status.didJustFinish) {
      startShadowing();
    }
  };

  const startShadowing = async () => {
    setIsRecording(true);
    const speech = await SpeechService.startListening();
    setUserSpeech(speech);
    setIsRecording(false);
  };

  return (
    <View style={styles.container} testID="video-container">
      <Video
        ref={videoRef}
        source={{ uri: `https://www.youtube.com/watch?v=${video.id}` }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={startShadowing}
        disabled={isRecording}
      >
        <Text>{isRecording ? "Recording..." : "Start Shadowing"}</Text>
      </TouchableOpacity>
      <Text style={styles.transcription}>{transcription}</Text>
      <Text style={styles.userSpeech}>{userSpeech}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: "100%",
    height: 300,
  },
  button: {
    padding: 15,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
  },
  transcription: {
    padding: 10,
    fontSize: 16,
  },
  userSpeech: {
    padding: 10,
    fontSize: 16,
    color: "blue",
  },
});
