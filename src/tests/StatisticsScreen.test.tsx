import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { StatisticsScreen } from "../screens/StatisticsScreen";
import { StorageService } from "../services/storage.service";

jest.mock("../services/storage.service");

describe("StatisticsScreen", () => {
  const mockUser = {
    id: "123",
    username: "testuser",
    createdAt: "2023-01-01",
    statistics: {
      totalSessions: 10,
      averageScore: 80.91,
    },
  };

  beforeEach(() => {
    (StorageService.getUser as jest.Mock).mockResolvedValue(mockUser);
  });

  it("displays user statistics correctly", async () => {
    const { getByText } = render(<StatisticsScreen />);

    await waitFor(() => {
      expect(getByText("10")).toBeTruthy();
      expect(getByText("80.91%")).toBeTruthy();
    });
  });
});
