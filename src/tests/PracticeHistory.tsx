import React from "react";
import { render } from "@testing-library/react-native";
import { PracticeHistory } from "../components/PracticeHistory";

describe("PracticeHistory", () => {
  const mockSessions = [
    {
      id: "1",
      date: new Date("2023-01-01"),
      videoTitle: "Test Video 1",
      score: 85,
      duration: 300,
    },
    {
      id: "2",
      date: new Date("2023-01-02"),
      videoTitle: "Test Video 2",
      score: 90,
      duration: 420,
    },
  ];

  it("renders practice sessions correctly", () => {
    const { getAllByTestId, getByText } = render(
      <PracticeHistory sessions={mockSessions} />,
    );

    expect(getAllByTestId("session-item")).toHaveLength(2);
    expect(getByText("Test Video 1")).toBeTruthy();
    expect(getByText("85%")).toBeTruthy();
    expect(getByText("5min")).toBeTruthy();
  });
});
