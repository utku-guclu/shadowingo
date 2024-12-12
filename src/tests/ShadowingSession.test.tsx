import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { ShadowingSession } from "../screens/ShadowingSession";

jest.useFakeTimers();

jest.mock("expo-av", () => ({
  Video: "Video",
  ResizeMode: {
    CONTAIN: "contain",
  },
}));

jest.mock("expo-speech", () => ({
  speak: jest.fn(),
}));

const mockStartListening = jest.fn().mockResolvedValue("test speech");

jest.mock("../services/speech.service", () => ({
  SpeechService: {
    startListening: () => mockStartListening(),
  },
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

    await act(async () => {
      fireEvent.press(getByText("Start Shadowing"));
    });

    expect(mockStartListening).toHaveBeenCalled();
  });

  it("displays score after shadowing completion", async () => {
    const { getByText } = render(<ShadowingSession route={mockRoute} />);

    await act(async () => {
      fireEvent.press(getByText("Start Shadowing"));
    });

    expect(getByText(/Score:/)).toBeTruthy();
    expect(getByText(/Grade:/)).toBeTruthy();
  });

  it("handles animations properly", () => {
    const { getByTestId } = render(<ShadowingSession route={mockRoute} />);

    jest.advanceTimersByTime(1000);

    expect(getByTestId("video-container")).toBeTruthy();
  });
});
