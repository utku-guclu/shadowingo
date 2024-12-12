import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { VideoSearch } from "../components/VideoSearch";
import { YouTubeService } from "../services/youtube.service";

jest.mock("../services/youtube.service");

describe("VideoSearch", () => {
  const mockOnResultsFound = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("searches videos when query is long enough", async () => {
    const { getByTestId } = render(
      <VideoSearch onResultsFound={mockOnResultsFound} />,
    );
    const searchInput = getByTestId("search-input");

    fireEvent.changeText(searchInput, "test query");

    expect(YouTubeService.searchVideos).toHaveBeenCalledWith("test query");
  });
});
