import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from "react";

export default function TabLayout() {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: () => <Ionicons name="home" size={24} color="purple" />,
            tabBarLabel: 'Home'
          }}
        />
        <Tabs.Screen
          name="cities"
          options={{
            title: "Cities",
            tabBarIcon: () => <MaterialCommunityIcons name="home-city" size={24} color="purple" />,
            tabBarLabel: 'Cities'
          }}
        />
      </Tabs>
    );
  }