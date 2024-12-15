import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface Props {
  duration: number; // in seconds
  onComplete: () => void;
  isActive: boolean;
}

export const ShadowingTimer = ({ duration, onComplete, isActive }: Props) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const progress = new Animated.Value(0);

  useEffect(() => {
    if (isActive) {
      const animation = Animated.timing(progress, {
        toValue: 1,
        duration: duration * 1000,
        useNativeDriver: false,
      });

      animation.start();

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        animation.stop();
      };
    }
  }, [isActive]);

  return (
    <View style={styles.container} testID="shadowing-timer">
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
      <Text style={styles.timeText}>
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    overflow: "hidden",
  },
  progressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#2196F3",
  },
  timeText: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
