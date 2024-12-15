import React from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  enabled: boolean;
  time: string;
  daysOfWeek: string[];
  onToggle: (value: boolean) => void;
  onTimePress: () => void;
  onDaysPress: () => void;
}

export const PracticeReminder = ({
  enabled,
  time,
  daysOfWeek,
  onToggle,
  onTimePress,
  onDaysPress,
}: Props) => {
  return (
    <View style={styles.container} testID="reminder-container">
      <View style={styles.header}>
        <Text style={styles.title}>Daily Practice Reminder</Text>
        <Switch
          testID="reminder-switch"
          value={enabled}
          onValueChange={onToggle}
        />
      </View>

      <TouchableOpacity onPress={onTimePress} style={styles.setting}>
        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{time}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDaysPress} style={styles.setting}>
        <Text style={styles.label}>Days</Text>
        <Text style={styles.value}>{daysOfWeek.join(", ")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  value: {
    fontSize: 16,
    color: "#2196F3",
  },
});
