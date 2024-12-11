import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ShadowingSession } from "../screens/ShadowingSession";
import { SpeechService } from "../services/speech.service";

jest.mock("expo-av", () => ({
  Video: "Video",
  ResizeMode: {
    CONTAIN: "contain",
  },
}));

jest.mock("expo-speech", () => ({
  speak: jest.fn(),
}));

jest.mock("../services/speech.service", () => ({
  startListening: jest.fn().mockResolvedValue("test speech"),
}));

jest.mock("expo-modules-core", () => ({
  EventEmitter: jest.fn(),
  Platform: { select: jest.fn() },
}));

describe("ShadowingSession", () => {
  const mockVideo = {
    id: "123",
    title: "Test Video",
    thumbnail: "http://example.com/thumb.jpg",
    duration: "10:00",
  };

  const mockRoute = {
    params: {
      video: mockVideo,
    },
  };

  it("renders correctly with video props", () => {
    const { getByTestId } = render(<ShadowingSession route={mockRoute} />);
    expect(getByTestId("video-container")).toBeTruthy();
  });

  it("starts shadowing when button is pressed", async () => {
    const { getByText } = render(<ShadowingSession route={mockRoute} />);
    const button = getByText("Start Shadowing");
    fireEvent.press(button);
    expect(SpeechService.startListening).toHaveBeenCalled();
  });

  it("displays score after shadowing completion", async () => {
    const { getByText } = render(<ShadowingSession route={mockRoute} />);
    const button = getByText("Start Shadowing");
    fireEvent.press(button);

    await waitFor(() => {
      expect(getByText(/Score:/)).toBeTruthy();
      expect(getByText(/Grade:/)).toBeTruthy();
    });
  });
});
