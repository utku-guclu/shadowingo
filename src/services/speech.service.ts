import * as Speech from 'expo-speech';
import { Audio } from 'expo-av'; 

class SpeechService {
    private currentLocale: string = "en-US";
    private onSpeechCallback?: (speech: string) => void;
    private sound: Audio.Sound | null = null;

    setLocale(locale: string) {
        this.currentLocale = locale;
        console.log(`Locale set to: ${this.currentLocale}`);
    }

    async initialize() {
        // Request microphone permissions
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
            console.error('Microphone permission not granted');
            return;
        }
        console.log("Speech service initialized");
    }

    async initializeAudio() {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access audio was denied');
            return;
        }
        console.log("Audio initialized, ready for recording.");
    }

    async startListening(callback: (speech: string) => void): Promise<string> {
        await this.initializeAudio(); // Initialize audio before starting listening

        this.onSpeechCallback = callback;
        console.log("Starting voice recognition...");

        // Placeholder for actual voice recognition logic
        return "User speech recognized"; // Replace with actual recognition result
    }

    stopListening() {
        console.log("Stopping voice recognition...");
    }

    speak(text: string) {
        if (text.length > Speech.maxSpeechInputLength) {
            throw new Error(`Text exceeds maximum length of ${Speech.maxSpeechInputLength}`);
        }
        Speech.speak(text);
    }

    async destroy() {
        console.log("Speech service destroyed");
    }

    async getSupportedLocales(): Promise<string[]> {
        return ["en-US", "fr-FR", "es-ES", "jp-JP", "tr-TR"];
    }
}

export default new SpeechService();