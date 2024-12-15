import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PracticeReminder } from "../components/PracticeReminder";

describe("PracticeReminder", () => {
  const mockProps = {
    enabled: true,
    time: "09:00",
    daysOfWeek: ["Mon", "Wed", "Fri"],
    onToggle: jest.fn(),
    onTimePress: jest.fn(),
    onDaysPress: jest.fn(),
  };

  it("renders reminder settings correctly", () => {
    const { getByTestId, getByText } = render(
      <PracticeReminder {...mockProps} />,
    );

    expect(getByTestId("reminder-switch")).toBeTruthy();
    expect(getByText("09:00")).toBeTruthy();
    expect(getByText("Mon, Wed, Fri")).toBeTruthy();
  });
});
