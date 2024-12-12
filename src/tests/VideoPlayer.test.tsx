import React from "react";
import { render } from "@testing-library/react-native";
import { VideoPlayer } from "../components/VideoPlayer";

jest.mock("react-native-youtube-iframe", () => "YoutubePlayer");

describe("VideoPlayer", () => {
  const mockVideo = {
    id: "test123",
    title: "Test Video",
    thumbnail: "test-url",
  };

  it("renders video player correctly", () => {
    const { getByTestId } = render(<VideoPlayer video={mockVideo} />);
    expect(getByTestId("video-player")).toBeTruthy();
  });
});
