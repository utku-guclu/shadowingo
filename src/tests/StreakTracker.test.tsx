import React from "react";
import { render } from "@testing-library/react-native";
import { StreakTracker } from "../components/StreakTracker";

describe("StreakTracker", () => {
  it("displays streak information correctly", () => {
    const { getByText } = render(
      <StreakTracker
        currentStreak={5}
        longestStreak={10}
        lastPracticeDate={new Date()}
      />,
    );

    expect(getByText("5")).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
    expect(getByText("🔥 Active today!")).toBeTruthy();
  });
});
