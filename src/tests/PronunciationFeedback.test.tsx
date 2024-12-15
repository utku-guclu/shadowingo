import React from "react";
import { render } from "@testing-library/react-native";
import { PronunciationFeedback } from "../components/PronunciationFeedback";

describe("PronunciationFeedback", () => {
  const mockProps = {
    word: "Hello",
    accuracy: 85,
    phonemes: [
      { symbol: "h", score: 90 },
      { symbol: "ə", score: 85 },
      { symbol: "l", score: 80 },
      { symbol: "oʊ", score: 85 },
    ],
  };

  it("renders pronunciation feedback correctly", () => {
    const { getByText, getByTestId } = render(
      <PronunciationFeedback {...mockProps} />,
    );

    expect(getByTestId("pronunciation-feedback")).toBeTruthy();
    expect(getByText("Hello")).toBeTruthy();
    expect(getByText("85% Accurate")).toBeTruthy();
  });
});
