import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Screens
import { OnboardingScreen } from "./src/screens/OnboardingScreen";
import { VideoSelectionScreen } from "./src/screens/VideoSelectionScreen";
import { ShadowingSession } from "./src/screens/ShadowingSession";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { StatisticsScreen } from "./src/screens/StatisticsScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";

export type RootStackParamList = {
  Onboarding: undefined;
  VideoSelection: undefined;
  Shadowing: {
    video: {
      id: string;
      title: string;
      thumbnail: string;
      duration: string;
    };
  };
};

export type TabParamList = {
  Practice: undefined;
  Statistics: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Onboarding"
      component={OnboardingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="VideoSelection"
      component={VideoSelectionScreen}
      options={{ title: "Choose Video" }}
    />
    <Stack.Screen
      name="Shadowing"
      component={ShadowingSession}
      options={{ title: "Practice Session" }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Practice":
                iconName = focused ? "play-circle" : "play-circle-outline";
                break;
              case "Statistics":
                iconName = focused ? "stats-chart" : "stats-chart-outline";
                break;
              case "Profile":
                iconName = focused ? "person" : "person-outline";
                break;
              case "Settings":
                iconName = focused ? "settings" : "settings-outline";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2196F3",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Practice"
          component={MainStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Statistics" component={StatisticsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
