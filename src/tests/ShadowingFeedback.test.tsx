import React from "react";
import { render } from "@testing-library/react-native";
import { ShadowingFeedback } from "../components/ShadowingFeedback";

describe("ShadowingFeedback", () => {
  it("displays performance metrics correctly", () => {
    const { getByText } = render(
      <ShadowingFeedback accuracy={85} pronunciation={92} timing={78} />,
    );

    expect(getByText("85%")).toBeTruthy();
    expect(getByText("92%")).toBeTruthy();
    expect(getByText("78%")).toBeTruthy();
  });
});
