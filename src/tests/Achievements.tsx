import React from "react";
import { render } from "@testing-library/react-native";
import { Achievements } from "../components/Achievements";

describe("Achievements", () => {
  const mockAchievements = [
    {
      id: "1",
      title: "First Shadow",
      description: "Complete your first shadowing session",
      icon: "https://example.com/icon1.png",
      unlocked: true,
      progress: 100,
    },
    {
      id: "2",
      title: "Perfect Score",
      description: "Get 100% on any session",
      icon: "https://example.com/icon2.png",
      unlocked: false,
      progress: 75,
    },
  ];

  it("renders achievements correctly", () => {
    const { getAllByTestId, getByText } = render(
      <Achievements achievements={mockAchievements} />,
    );

    expect(getAllByTestId("achievement-item")).toHaveLength(2);
    expect(getByText("First Shadow")).toBeTruthy();
    expect(getByText("Perfect Score")).toBeTruthy();
  });
});
