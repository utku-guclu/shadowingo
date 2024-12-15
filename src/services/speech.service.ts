import * as Speech from "expo-speech";
import Voice, { SpeechResultsEvent } from "@react-native-voice/voice";

export class SpeechService {
  private static voice = Voice;

  static async initialize() {
    await Voice.isAvailable();
  }

  static async startListening(): Promise<string> {
    await this.initialize(); // Add this line
    try {
      await this.voice.start("en-US");

      return new Promise((resolve) => {
        this.voice.onSpeechResults = (e: SpeechResultsEvent) => {
          if (e.value && e.value[0]) {
            this.voice.stop();
            resolve(e.value[0]);
          }
        };
      });
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      return "";
    }
  }
  static async speak(text: string): Promise<void> {
    await Speech.speak(text, {
      language: "en",
      pitch: 1.0,
      rate: 0.8,
    });
  }

  static async stopListening(): Promise<void> {
    await this.voice.stop();
  }

  static async destroy(): Promise<void> {
    await this.voice.destroy();
  }
}
