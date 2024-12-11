import * as Speech from "expo-speech";

export class SpeechService {
  static async startListening(): Promise<string> {
    // This is a placeholder until we implement actual speech recognition
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("User speech content");
      }, 2000);
    });
  }

  static async speak(text: string): Promise<void> {
    await Speech.speak(text, {
      language: "en",
      pitch: 1.0,
      rate: 0.8,
    });
  }
}
