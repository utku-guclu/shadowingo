import React from "react";
import { render } from "@testing-library/react-native";
import { OnboardingScreen } from "../screens/OnboardingScreen";

// Add complete React Native mock
jest.mock("react-native", () => ({
  StyleSheet: {
    create: (styles: any) => styles,
  },
  View: "View",
  Text: "Text",
  TouchableOpacity: "TouchableOpacity",
  Animated: {
    View: "Animated.View",
    createAnimatedComponent: (component: any) => component,
    Value: jest.fn(),
    timing: jest.fn(),
  },
  Dimensions: {
    get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
  },
}));

describe("OnboardingScreen", () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  it("renders correctly", () => {
    const { getByTestId } = render(
      <OnboardingScreen navigation={mockNavigation} />,
    );
    expect(getByTestId("onboarding-container")).toBeTruthy();
  });
});
