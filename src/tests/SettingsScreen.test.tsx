import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SettingsScreen } from "../screens/SettingsScreen";
import { StorageService } from "../services/storage.service";

jest.mock("../services/storage.service");

describe("SettingsScreen", () => {
  beforeEach(() => {
    (StorageService.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({
        autoPlay: true,
        showSubtitles: true,
        playbackSpeed: 1.0,
      }),
    );
  });

  it("updates settings when toggled", async () => {
    const { getByTestId } = render(<SettingsScreen />);

    await waitFor(() => {
      const autoPlaySwitch = getByTestId("autoplay-switch");
      fireEvent(autoPlaySwitch, "valueChange", false);
    });

    expect(StorageService.setItem).toHaveBeenCalledWith(
      "user_settings",
      expect.stringContaining('"autoPlay":false'),
    );
  });
});
