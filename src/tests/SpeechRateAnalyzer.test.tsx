import React from "react";
import { render } from "@testing-library/react-native";
import { SpeechRateAnalyzer } from "../components/SpeechRateAnalyzer";

describe("SpeechRateAnalyzer", () => {
  it("displays perfect status when rates are close", () => {
    const { getByText } = render(
      <SpeechRateAnalyzer targetRate={120} userRate={125} difference={5} />,
    );

    expect(getByText("Perfect!")).toBeTruthy();
  });

  it("suggests speed adjustment when needed", () => {
    const { getByText } = render(
      <SpeechRateAnalyzer targetRate={120} userRate={90} difference={-30} />,
    );

    expect(getByText("Slow down")).toBeTruthy();
  });
});
