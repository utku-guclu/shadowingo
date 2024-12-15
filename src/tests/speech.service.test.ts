import { SpeechService } from "../services/speech.service";

import Speech from "expo-speech";

const mockVoice = {
  start: jest.fn().mockResolvedValue(true),
  stop: jest.fn().mockResolvedValue(true),
  destroy: jest.fn().mockResolvedValue(true),
  onSpeechResults: null as ((e: { value: string[] }) => void) | null,
};

jest.mock("@react-native-voice/voice", () => ({
  __esModule: true,
  default: mockVoice,
}));

jest.mock("expo-speech", () => ({
  speak: jest.fn().mockResolvedValue(true),
}));

describe("SpeechService", () => {
  /* it("starts listening and returns speech result", (done) => {
    const mockResult = "test speech";

    SpeechService.startListening().then((result) => {
      expect(result).toBe(mockResult);
      done();
    });

    // Simulate voice recognition result
    setTimeout(() => {
      if (mockVoice.onSpeechResults) {
        mockVoice.onSpeechResults({ value: [mockResult] });
      }
    }, 100);
  }); */

  it("speaks text correctly", async () => {
    await SpeechService.speak("Hello");
    expect(Speech.speak).toHaveBeenCalledWith("Hello", {
      language: "en",
      pitch: 1.0,
      rate: 0.8,
    });
  });
});
