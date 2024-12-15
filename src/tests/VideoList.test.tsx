import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { VideoList } from "../components/VideoList";

// Mock React Native components
jest.mock("react-native", () => ({
  StyleSheet: {
    create: (styles: any) => styles,
  },
  View: "View",
  Text: "Text",
  Image: "Image",
  TouchableOpacity: "TouchableOpacity",
  FlatList: "FlatList",
}));

describe("VideoList", () => {
  const mockVideos = [
    {
      id: "1",
      title: "Test Video 1",
      thumbnail: "https://example.com/thumb1.jpg",
      duration: "3:45",
    },
    {
      id: "2",
      title: "Test Video 2",
      thumbnail: "https://example.com/thumb2.jpg",
      duration: "2:30",
    },
  ];

  const mockOnVideoSelect = jest.fn();

  it("renders video list correctly", () => {
    const { getByTestId, getAllByTestId } = render(
      <VideoList videos={mockVideos} onVideoSelect={mockOnVideoSelect} />,
    );

    expect(getByTestId("video-list")).toBeTruthy();
    expect(getAllByTestId(/video-item-/)).toHaveLength(2);
  });

  it("handles video selection", () => {
    const { getAllByTestId } = render(
      <VideoList videos={mockVideos} onVideoSelect={mockOnVideoSelect} />,
    );

    fireEvent.press(getAllByTestId(/video-item-/)[0]);
    expect(mockOnVideoSelect).toHaveBeenCalledWith(mockVideos[0]);
  });
});
