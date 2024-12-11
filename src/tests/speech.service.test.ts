import { SpeechService } from "../services/speech.service";
import * as Speech from "expo-speech";

jest.mock("expo-speech", () => ({
  speak: jest.fn(),
}));

describe("SpeechService", () => {
  it("should call Speech.speak with correct parameters", async () => {
    const testText = "Hello World";
    await SpeechService.speak(testText);

    expect(Speech.speak).toHaveBeenCalledWith(testText, {
      language: "en",
      pitch: 1.0,
      rate: 0.8,
    });
  });

  it("should return speech content when listening", async () => {
    const result = await SpeechService.startListening();
    expect(result).toBe("User speech content");
  });
});
