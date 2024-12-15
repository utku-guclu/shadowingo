import { YOUTUBE_API_KEY } from "@env";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import YoutubePlayer from "react-native-youtube-iframe";
import { SpeechService } from "../services/speech.service";
import { ScoringService } from "../services/scoring.service";
import { VideoDetails } from "../services/youtube.service";
import { MaterialIcons } from "@expo/vector-icons";

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
  const [score, setScore] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentCaption, setCurrentCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [supportedLanguages, setSupportedLanguages] = useState<string[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const { video } = route.params;

  useEffect(() => {
    initializeSession();
    return () => {
      cleanup();
    };
  }, []);

  const initializeSession = async () => {
    setIsLoading(true);
    try {
      const languages = await SpeechService.getSupportedLocales();
      setSupportedLanguages(languages);
      SpeechService.setLocale(selectedLanguage);
      await SpeechService.initialize();
    } catch (error) {
      console.error("Failed to initialize speech service:", error);
    }
    setIsLoading(false);
  };

  const cleanup = async () => {
    await SpeechService.destroy();
  };

  const handleLanguageChange = useCallback(async (language: string) => {
    setSelectedLanguage(language);
    SpeechService.setLocale(language);
  }, []);

  const onStateChange = (state: string) => {
    if (state === "ended") {
      setPlaying(false);
      startShadowing();
    }
  };

  const onCaptionChange = (caption: string) => {
    setCurrentCaption(caption);
    setTranscription((prev) => prev + " " + caption);
  };

  const startShadowing = async () => {
    setIsRecording(true);
    try {
      const speech = await SpeechService.startListening();
      setUserSpeech(speech);
      calculateScore(speech);
    } catch (error) {
      console.error("Error during shadowing:", error);
    }
    setIsRecording(false);
  };

  const calculateScore = (speech: string) => {
    const similarity = ScoringService.calculateSimilarity(
      transcription,
      speech,
    );
    setScore(similarity);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const renderScoreSection = () =>
    score !== null && (
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>Performance Results</Text>
        <Text style={styles.scoreValue}>Score: {score.toFixed(1)}%</Text>
        <Text style={styles.gradeValue}>
          Grade: {ScoringService.getGrade(score)}
        </Text>
      </View>
    );

  const fetchCaptions = async (videoId: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}`,
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const captionTrack = data.items[0];
        setTranscription(captionTrack.snippet.text);
      }
    } catch (error) {
      console.error("Error fetching captions:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Preparing session...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.languagePickerContainer}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={handleLanguageChange}
          style={styles.languagePicker}
        >
          {supportedLanguages.map((language) => (
            <Picker.Item key={language} label={language} value={language} />
          ))}
        </Picker>
      </View>

      <View style={styles.videoContainer} testID="video-container">
        <YoutubePlayer
          height={220}
          play={playing}
          videoId={video.id}
          onChangeState={onStateChange}
          onReady={() => fetchCaptions(video.id)}
          // For captions, we can use the onPlaybackQualityChange prop to track caption updates
          onPlaybackQualityChange={(caption: string) =>
            onCaptionChange(caption)
          }
          // Additional available props:
          webViewProps={{
            allowsFullscreenVideo: true,
            allowsInlineMediaPlayback: true,
            mediaPlaybackRequiresUserAction: false,
          }}
          initialPlayerParams={{
            cc_lang_pref: selectedLanguage,
            rel: false,
            showClosedCaptions: true,
          }}
        />
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handlePlayPause}
        >
          <MaterialIcons
            name={playing ? "pause" : "play-arrow"}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordingActive]}
          onPress={startShadowing}
          disabled={isRecording}
        >
          <MaterialIcons
            name={isRecording ? "mic" : "mic-none"}
            size={24}
            color="white"
          />
          <Text style={styles.buttonText}>
            {isRecording ? "Recording..." : "Start Shadowing"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transcriptionContainer}>
        <View style={styles.captionBox}>
          <Text style={styles.sectionTitle}>YouTube Captions</Text>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollBox}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.captionText}>{currentCaption}</Text>
          </ScrollView>
        </View>

        <View style={styles.speechBox}>
          <Text style={styles.sectionTitle}>Your Speech</Text>
          <ScrollView
            style={styles.scrollBox}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.speechText}>{userSpeech}</Text>
          </ScrollView>
        </View>
      </View>

      {renderScoreSection()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  languagePickerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
  languagePicker: {
    height: 50,
    width: "100%",
  },
  videoContainer: {
    backgroundColor: "#000",
    width: "100%",
    aspectRatio: 16 / 9,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
  },
  controlButton: {
    backgroundColor: "#4a90e2",
    padding: 12,
    borderRadius: 25,
  },
  recordButton: {
    flexDirection: "row",
    backgroundColor: "#2ecc71",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    minWidth: 150,
    justifyContent: "center",
  },
  recordingActive: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "600",
  },
  transcriptionContainer: {
    flex: 1,
    padding: 10,
  },
  captionBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  speechBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3e50",
  },
  scrollBox: {
    flex: 1,
  },
  captionText: {
    fontSize: 16,
    color: "#34495e",
    lineHeight: 24,
  },
  speechText: {
    fontSize: 16,
    color: "#2980b9",
    lineHeight: 24,
  },
  scoreContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#27ae60",
  },
  gradeValue: {
    fontSize: 20,
    color: "#16a085",
    marginTop: 4,
  },
});
