import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "expo-router";
import * as z from "zod";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const registerSchema = z.object({
  first_name: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(12, "Maximum 12 characters"),
  last_name: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(16, "Maximum 16 characters"),
  email: z
    .string()
    .email("Invalid email")
    .min(10, "Minimum 10 characters")
    .max(30, "Maximun 30 characters"),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .max(16, "Maximum 16 characters"),
  country: z
    .string()
    .min(3, "Minimun 3 characters")
    .max(20, "Maximum 20 characters"),
  description: z
    .string()
    .min(30, "Minimun 30 characters")
    .max(500, "Maximun 500 characters"),
  image: z.string().url("Invalid Url").optional(),
});

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      console.log("✅ Token guardado con éxito");
    } catch (error) {
      console.error("❌ Error guardando el token:", error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    setLoading(true);

    const cleanData = {
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      country: data.country.trim(),
      description: data.description?.trim() || undefined,
      image: data.image?.trim() || undefined,
    };

    console.log("📌 Enviando datos:", JSON.stringify(cleanData, null, 2));
    try {
      const response = await axios.post(
        "https://mytinerary-server.onrender.com/api/auth/register",
        cleanData
      );

      console.log(JSON.stringify(response.data));
      console.log("TOKEN " + JSON.stringify(response.data.token));
      if (response.data.status === 201) {
        const { token, ...userData } = response.data.response; // Extrae el token y los datos del usuario
        try {
          await AsyncStorage.setItem("token", token); // Almacena el token en AsyncStorage
          dispatch(setUser(userData)); // Almacena los datos del usuario en Redux (opcional)
          Alert.alert("Success", "User registered successfully");
          router.push("/auth/LoginScreen");
        } catch (error) {
          console.error("Error storing token:", error);
          Alert.alert("Error", "Failed to store token.");
        }
      } else {
        Alert.alert(
          "Error",
          response.data.message || "There was a problem with the registration"
        );
      }
    } catch (error) {
      console.error("Error registering user:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Server error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Text>Name:</Text>
        <Controller
          control={control}
          name="first_name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.first_name && (
          <Text style={styles.error}>{errors.first_name.message}</Text>
        )}
        <Text>LastName:</Text>
        <Controller
          control={control}
          name="last_name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="LastName"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.last_name && (
          <Text style={styles.error}>{errors.last_name.message}</Text>
        )}
        <Text>Email:</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="example@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        <Text>Password:</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
        ,<Text>Country:</Text>
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Country"
              keyboardType="twitter"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.country && (
          <Text style={styles.error}>{errors.country.message}</Text>
        )}
        <Text>description:</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Description"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={3}
            />
          )}
        />
        {errors.description && (
          <Text style={styles.error}>{errors.description.message}</Text>
        )}
        <Text>Image:</Text>
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Image"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.image && (
          <Text style={styles.error}>{errors.image.message}</Text>
        )}
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Button
            color="#841584"
            title="Sign up"
            onPress={handleSubmit(onSubmit)}
          />
        )}
        <Text
          style={styles.link}
          onPress={() => router.push("/auth/LoginScreen")}
        >
          Already have an account? Sign in
        </Text>
      </View>
    </GestureHandlerRootView>
  );
}

// 📌 Estilos mejorados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  link: {
    color: "blue",
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
  },
});
