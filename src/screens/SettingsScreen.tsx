import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { StorageService } from "../services/storage.service";

interface Settings {
  autoPlay: boolean;
  showSubtitles: boolean;
  playbackSpeed: number;
}

export const SettingsScreen = () => {
  const [settings, setSettings] = useState<Settings>({
    autoPlay: true,
    showSubtitles: true,
    playbackSpeed: 1.0,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedSettings = await StorageService.getItem("user_settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const updateSetting = async (
    key: keyof Settings,
    value: boolean | number,
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await StorageService.setItem("user_settings", JSON.stringify(newSettings));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingItem}>
        <Text>Auto-play Videos</Text>
        <Switch
          testID="autoplay-switch"
          value={settings.autoPlay}
          onValueChange={(value) => updateSetting("autoPlay", value)}
        />
      </View>

      <View style={styles.settingItem}>
        <Text>Show Subtitles</Text>
        <Switch
          testID="subtitles-switch"
          value={settings.showSubtitles}
          onValueChange={(value) => updateSetting("showSubtitles", value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
