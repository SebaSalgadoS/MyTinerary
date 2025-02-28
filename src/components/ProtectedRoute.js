import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../src/hooks/useAuth"

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const navigation = useNavigation();

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  if (!isAuthenticated) {
    navigation.replace("/auth/LoginScreen");
    return <View />;
  }

  return children;
}