import React from "react";
import { render, act } from "@testing-library/react-native";
import { ShadowingTimer } from "../components/ShadowingTimer";

jest.useFakeTimers();

describe("ShadowingTimer", () => {
  const mockOnComplete = jest.fn();

  it("renders initial time correctly", () => {
    const { getByText } = render(
      <ShadowingTimer
        duration={120}
        onComplete={mockOnComplete}
        isActive={true}
      />,
    );

    expect(getByText("2:00")).toBeTruthy();
  });

  it("counts down when active", () => {
    const { getByText } = render(
      <ShadowingTimer
        duration={120}
        onComplete={mockOnComplete}
        isActive={true}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText("1:59")).toBeTruthy();
  });

  it("calls onComplete when timer finishes", () => {
    render(
      <ShadowingTimer
        duration={3}
        onComplete={mockOnComplete}
        isActive={true}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnComplete).toHaveBeenCalled();
  });

  it("stops counting when not active", () => {
    const { getByText } = render(
      <ShadowingTimer
        duration={120}
        onComplete={mockOnComplete}
        isActive={false}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText("2:00")).toBeTruthy();
  });
});
