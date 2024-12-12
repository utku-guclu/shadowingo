import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { VideoList } from "../components/VideoList";

describe("VideoList", () => {
  const mockVideos = [
    { id: "1", title: "Video 1", thumbnail: "url1" },
    { id: "2", title: "Video 2", thumbnail: "url2" },
  ];

  const mockOnVideoSelect = jest.fn();

  it("renders list of videos", () => {
    const { getByTestId, getByText } = render(
      <VideoList videos={mockVideos} onVideoSelect={mockOnVideoSelect} />,
    );

    expect(getByTestId("video-list")).toBeTruthy();
    expect(getByText("Video 1")).toBeTruthy();
    expect(getByText("Video 2")).toBeTruthy();
  });
});
