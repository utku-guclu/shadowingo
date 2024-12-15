import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { ShadowingSession } from "../screens/ShadowingSession";

jest.useFakeTimers();

jest.mock("react-native-youtube-iframe", () => {
  const React = require("react");
  const { View } = require("react-native");
  return function MockYoutubePlayer({ videoId, height }: any) {
    return React.createElement(View, {
      testID: `youtube-player-${videoId}`,
      style: { height },
    });
  };
});

const mockStartListening = jest.fn().mockResolvedValue("test speech");

jest.mock("../services/speech.service", () => ({
  SpeechService: {
    startListening: () => mockStartListening(),
  },
}));

jest.mock("../services/scoring.service", () => ({
  ScoringService: {
    calculateSimilarity: () => 85,
    getGrade: () => "A",
  },
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
