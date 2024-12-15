import React from "react";
import { render } from "@testing-library/react-native";
import { PracticeReminder } from "../components/PracticeReminder";

jest.mock("react-native", () => ({
  StyleSheet: {
    create: (styles: any) => styles,
  },
  View: "View",
  Text: "Text",
  TouchableOpacity: "TouchableOpacity",
  Switch: "Switch",
}));

describe("PracticeReminder", () => {
  const mockProps = {
    enabled: true,
    time: "09:00",
    daysOfWeek: ["Monday", "Wednesday", "Friday"],
    onToggle: jest.fn(),
    onTimePress: jest.fn(),
    onDaysPress: jest.fn(),
  };

  it("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <PracticeReminder {...mockProps} />,
    );
    expect(getByText("Daily Practice Reminder")).toBeTruthy();
    expect(getByTestId("reminder-container")).toBeTruthy();
  });
});
