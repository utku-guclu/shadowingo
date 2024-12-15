import React from "react";
import { render } from "@testing-library/react-native";
import { StatsDashboard } from "../components/StatsDashboard";

describe("StatsDashboard", () => {
  const mockStats = {
    totalPracticeTime: 7200, // 2 hours in seconds
    averageScore: 85,
    sessionsCompleted: 42,
    perfectScores: 7,
  };

  it("renders all statistics correctly", () => {
    const { getByText, getByTestId } = render(
      <StatsDashboard stats={mockStats} />,
    );

    expect(getByTestId("stats-dashboard")).toBeTruthy();
    expect(getByText("2h")).toBeTruthy();
    expect(getByText("85%")).toBeTruthy();
    expect(getByText("42")).toBeTruthy();
    expect(getByText("7")).toBeTruthy();
  });

  it("displays correct labels", () => {
    const { getByText } = render(<StatsDashboard stats={mockStats} />);

    expect(getByText("Total Practice")).toBeTruthy();
    expect(getByText("Avg Score")).toBeTruthy();
    expect(getByText("Sessions")).toBeTruthy();
    expect(getByText("Perfect Scores")).toBeTruthy();
  });
});
