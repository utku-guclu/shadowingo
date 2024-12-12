import React from "react";
import { render } from "@testing-library/react-native";
import { ProgressBar } from "../components/ProgressBar";

describe("ProgressBar", () => {
  it("renders progress correctly", () => {
    const { getByTestId } = render(
      <ProgressBar progress={50} duration={100} />,
    );

    const progressIndicator = getByTestId("progress-indicator");
    expect(progressIndicator.props.style).toContainEqual({ width: "50%" });
  });
});
