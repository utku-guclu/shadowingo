import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { VideoSelectionScreen } from "../screens/VideoSelectionScreen";
import { YouTubeService } from "../services/youtube.service";

jest.mock("../services/youtube.service");

describe("VideoSelectionScreen", () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockVideos = [
    {
      id: "123",
      title: "Test Video",
      thumbnail: "http://example.com/thumb.jpg",
      duration: "10:00",
    },
  ];

  beforeEach(() => {
    (YouTubeService.searchVideos as jest.Mock).mockResolvedValue(mockVideos);
  });

  it("should search and display videos", async () => {
    const { getByPlaceholderText, findByTestId } = render(
      <VideoSelectionScreen navigation={mockNavigation} />,
    );

    const searchInput = getByPlaceholderText("Search videos...");
    fireEvent.changeText(searchInput, "test query");
    fireEvent(searchInput, "submitEditing");

    await waitFor(() => {
      expect(YouTubeService.searchVideos).toHaveBeenCalledWith("test query");
    });
  });
});
