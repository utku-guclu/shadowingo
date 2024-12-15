import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PracticeGoals } from "../components/PracticeGoals";

describe("PracticeGoals", () => {
  const mockGoals = [
    {
      id: "1",
      title: "Daily Practice",
      target: 30,
      current: 15,
      unit: "minutes",
    },
    {
      id: "2",
      title: "Weekly Sessions",
      target: 5,
      current: 3,
      unit: "sessions",
    },
  ];

  const mockOnGoalPress = jest.fn();

  it("renders goals correctly", () => {
    const { getByText, getAllByTestId } = render(
      <PracticeGoals goals={mockGoals} onGoalPress={mockOnGoalPress} />,
    );

    expect(getByText("Daily Practice")).toBeTruthy();
    expect(getByText("15/30 minutes")).toBeTruthy();
    expect(getAllByTestId(/goal-/)).toHaveLength(2);
  });
});
