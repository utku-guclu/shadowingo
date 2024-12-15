import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";

// Mock modules before importing the component
jest.mock("react-native-youtube-iframe", () => "YoutubePlayer", {
  virtual: true,
});
jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: "MaterialIcons",
}));
jest.mock("@env", () => ({
  YOUTUBE_API_KEY: "mock-api-key",
}));

// Import component after mocks
import { ShadowingSession } from "../screens/ShadowingSession";

const mockStartListening = jest.fn().mockResolvedValue("test speech");
jest.mock("../services/speech.service", () => ({
  SpeechService: {
    startListening: () => mockStartListening(),
    initialize: jest.fn().mockResolvedValue(undefined),
    destroy: jest.fn().mockResolvedValue(undefined),
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
  });
});
