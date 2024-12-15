import React from "react";
import { render } from "@testing-library/react-native";
import { StatisticsScreen } from "../screens/StatisticsScreen";

// Mock StorageService
jest.mock("../services/storage.service", () => ({
  StorageService: {
    getUser: jest.fn().mockResolvedValue({
      statistics: {
        totalSessions: 42,
        averageScore: 85,
      },
    }),
  },
}));

// Mock React Native components
jest.mock("react-native", () => ({
  StyleSheet: {
    create: (styles: any) => styles,
  },
  View: "View",
  Text: "Text",
}));

describe("StatisticsScreen", () => {
  it("renders statistics correctly", async () => {
    const { findByText } = render(<StatisticsScreen />);

    expect(await findByText("Your Progress")).toBeTruthy();
    expect(await findByText("42")).toBeTruthy();
    expect(await findByText("85%")).toBeTruthy();
  });
});
