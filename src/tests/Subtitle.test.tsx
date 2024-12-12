import React from "react";
import { render } from "@testing-library/react-native";
import { SubtitleDisplay } from "../components/SubtitleDisplay";

describe("SubtitleDisplay", () => {
  it("displays subtitle text correctly", () => {
    const testText = "Test subtitle";
    const { getByText, getByTestId } = render(
      <SubtitleDisplay text={testText} />,
    );

    expect(getByTestId("subtitle-text")).toBeTruthy();
    expect(getByText(testText)).toBeTruthy();
  });

  it("applies highlight style when specified", () => {
    const { getByTestId } = render(
      <SubtitleDisplay text="Test" isHighlighted={true} />,
    );

    const subtitleText = getByTestId("subtitle-text");
    expect(subtitleText.props.style).toContainEqual(
      expect.objectContaining({
        backgroundColor: "#2196F3",
      }),
    );
  });
});
