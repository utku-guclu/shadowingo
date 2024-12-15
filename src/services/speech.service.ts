import Voice from "@react-native-voice/voice";

export class SpeechService {
  private static currentLocale: string = "en-US";

  static setLocale(locale: string) {
    this.currentLocale = locale;
  }

  static getLocale(): string {
    return this.currentLocale;
  }

  static async initialize() {
    try {
      const isAvailable = await Voice.isAvailable();
      if (!isAvailable) {
        throw new Error("Speech recognition is not available");
      }
      await Voice.start(this.currentLocale);
    } catch (error) {
      throw new Error(`Speech initialization failed: ${error}`);
    }
  }

  static async startListening(): Promise<string> {
    try {
      await Voice.start(this.currentLocale);
      return new Promise((resolve, reject) => {
        Voice.onSpeechResults = (e: any) => {
          if (e.value && e.value.length > 0) {
            resolve(e.value[0]);
          }
        };
        Voice.onSpeechError = (e: any) => {
          reject(e);
        };
      });
    } catch (error) {
      throw new Error(`Speech recognition failed: ${error}`);
    }
  }

  static async destroy() {
    try {
      await Voice.destroy();
    } catch (error) {
      console.warn("Speech service cleanup error:", error);
    }
  }
  static async getSupportedLocales(): Promise<string[]> {
    try {
      const locales = await Voice.getSpeechRecognitionServices();
      return locales || [];
    } catch (error) {
      throw new Error(`Failed to get supported locales: ${error}`);
    }
  }
}
