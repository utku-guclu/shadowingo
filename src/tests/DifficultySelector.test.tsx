import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { DifficultySelector } from "../components/DifficultySelector";

describe("DifficultySelector", () => {
  const mockOnSelect = jest.fn();

  it("renders all difficulty levels", () => {
    const { getByText } = render(
      <DifficultySelector selected="beginner" onSelect={mockOnSelect} />,
    );

    expect(getByText("Beginner")).toBeTruthy();
    expect(getByText("Intermediate")).toBeTruthy();
    expect(getByText("Advanced")).toBeTruthy();
  });

  it("handles difficulty selection", () => {
    const { getByTestId } = render(
      <DifficultySelector selected="beginner" onSelect={mockOnSelect} />,
    );

    fireEvent.press(getByTestId("difficulty-advanced"));
    expect(mockOnSelect).toHaveBeenCalledWith("advanced");
  });
});
