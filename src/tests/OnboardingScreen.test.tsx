import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { StorageService } from "../services/storage.service";

jest.mock("../services/storage.service");

describe("OnboardingScreen", () => {
  const mockNavigation = {
    replace: jest.fn(),
  };

  it("should save user data and navigate to home", async () => {
    const { getByPlaceholderText, getByText } = render(
      <OnboardingScreen navigation={mockNavigation} />,
    );

    const input = getByPlaceholderText("Enter your username");
    fireEvent.changeText(input, "testuser");

    const button = getByText("Get Started");
    fireEvent.press(button);

    await waitFor(() => {
      expect(StorageService.saveUser).toHaveBeenCalled();
      expect(mockNavigation.replace).toHaveBeenCalledWith("Home");
    });
  });
});
