import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { VideoControls } from "../components/VideoControls";

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

describe("VideoControls", () => {
  const mockProps = {
    isPlaying: false,
    onPlayPause: jest.fn(),
    onRewind: jest.fn(),
    onForward: jest.fn(),
  };

  it("handles control actions correctly", () => {
    const { getByTestId } = render(<VideoControls {...mockProps} />);

    fireEvent.press(getByTestId("play-pause-button"));
    expect(mockProps.onPlayPause).toHaveBeenCalled();

    fireEvent.press(getByTestId("rewind-button"));
    expect(mockProps.onRewind).toHaveBeenCalled();

    fireEvent.press(getByTestId("forward-button"));
    expect(mockProps.onForward).toHaveBeenCalled();
  });
});
