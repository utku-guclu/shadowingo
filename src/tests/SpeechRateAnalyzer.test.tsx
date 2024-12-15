import React from "react";
import { render } from "@testing-library/react-native";
import { SpeechRateAnalyzer } from "../components/SpeechRateAnalyzer";

jest.mock("react-native", () => ({
  StyleSheet: {
    create: (styles: any) => styles,
  },
  View: "View",
  Text: "Text",
}));

describe("SpeechRateAnalyzer", () => {
  const mockProps = {
    targetRate: 130,
    userRate: 120,
    difference: -10,
  };

  it("renders correctly", () => {
    const { getByTestId } = render(<SpeechRateAnalyzer {...mockProps} />);
    expect(getByTestId("speech-rate-analyzer")).toBeTruthy();
  });

  it("displays correct rates", () => {
    const { getByText } = render(<SpeechRateAnalyzer {...mockProps} />);
    expect(getByText("130")).toBeTruthy();
    expect(getByText("120")).toBeTruthy();
  });

  it("shows perfect feedback when difference is within range", () => {
    const { getByText } = render(<SpeechRateAnalyzer {...mockProps} />);
    expect(getByText("Perfect!")).toBeTruthy();
  });
});
