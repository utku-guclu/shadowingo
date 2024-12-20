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
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import YoutubePlayer from "react-native-youtube-iframe";
import SpeechService from "../services/speech.service";
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
  const [displayText, setDisplayText] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentCaption, setCurrentCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [supportedLanguages, setSupportedLanguages] = useState<string[]>([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
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
      setIsRecording(false);
      setIsTranscribing(false);
    }
  };

  const onCaptionChange = (caption: string) => {
    setDisplayText((prev) => {
      if (prev.endsWith(caption)) {
        return prev;
      }
      const cleanedCaption = caption.replace(/(um|uh|like)\s+/g, '').trim();
      const newText = prev + " " + cleanedCaption;
      return newText.length > 100 ? newText.slice(-100) : newText;
    });
  };

  const startShadowing = async () => {
    setIsRecording(true);
    setIsTranscribing(true);
    try {
      await SpeechService.startListening((speech) => {
        setDisplayText((prev) => {
          const newText = prev + " " + speech;
          return newText.length > 100 ? newText.slice(-100) : newText;
        });
      });
    } catch (error) {
      console.error("Error during shadowing:", error);
    }
  };

  const calculateScore = (speech: string) => {
    const similarity = ScoringService.calculateSimilarity(
      currentCaption,
      speech,
    );
    setScore(similarity);
  };

  const handleStartShadowing = async () => {
    if (isTranscribing) {
      setIsTranscribing(false);
      setIsRecording(false);
      setPlaying(false);
      await SpeechService.stopListening();
    } else {
      setPlaying(true);
      setIsRecording(true);
      setIsTranscribing(true);
      await startShadowing();
    }
  };

  const fetchCaptions = async (videoId: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}`,
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const captionTrack = data.items[0];
        setCurrentCaption(captionTrack.snippet.text);
      }
    } catch (error) {
      console.error("Error fetching captions:", error);
    }
  };

  const handleSpeak = () => {
    const textToSpeak = 'Welcome to the shadowing session!';
    SpeechService.speak(textToSpeak);
  };

  const handleTextToSpeech = () => {
    const textToSpeak = displayText;
    SpeechService.speak(textToSpeak);
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
          onPlaybackQualityChange={(caption: string) => onCaptionChange(caption)}
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

      <View style={styles.transcriptionContainer}>
        <Text style={styles.transcriptionTitle}>Current Text:</Text>
        <Text style={styles.transcriptionText}>{displayText || "No speech detected"}</Text>
      </View>

      <View style={styles.transcriptionContainer}>
        <Text style={styles.transcriptionTitle}>Transcription:</Text>
        <Text style={styles.transcriptionText}>{displayText}</Text>
      </View>

      <TouchableOpacity
        style={[styles.controlButton, isTranscribing ? styles.recordingButton : null]}
        onPress={handleStartShadowing}
      >
        <Text style={styles.buttonText}>{isTranscribing ? "Stop Transcribing" : "Start Transcribing"}</Text>
      </TouchableOpacity>

      <Button title="Speak" onPress={handleSpeak} />
      <Button title="Text to Speech" onPress={handleTextToSpeech} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
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
    marginBottom: 16,
  },
  transcriptionContainer: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  transcriptionTitle: {
    fontWeight: "bold",
  },
  transcriptionText: {
    fontSize: 16,
    color: "#333",
  },
  controlButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  recordingButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
