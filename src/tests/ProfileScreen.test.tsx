import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { ProfileScreen } from "../screens/ProfileScreen";
import { StorageService } from "../services/storage.service";

jest.mock("../services/storage.service");

describe("ProfileScreen", () => {
  const mockUser = {
    id: "123",
    username: "testuser",
    avatar: "https://example.com/avatar.jpg",
    createdAt: "2023-01-01",
    statistics: {
      totalSessions: 10,
      averageScore: 80.91,
    },
  };

  beforeEach(() => {
    (StorageService.getUser as jest.Mock).mockResolvedValue(mockUser);
  });

  it("renders user profile correctly", async () => {
    const { getByText, getByTestId } = render(<ProfileScreen />);

    await waitFor(() => {
      expect(getByTestId("profile-container")).toBeTruthy();
      expect(getByText("testuser")).toBeTruthy();
      expect(getByText("10")).toBeTruthy();
      expect(getByText("80.91%")).toBeTruthy();
    });
  });
});
