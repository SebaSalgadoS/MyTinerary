import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authReducer } from "../../store/reducer/authReducer";
import { setUser } from "../../slice/authSlice";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../../services/login/user.services";
import AuthServices from "../../services/login/user.services";
import useUser from "../../hooks/useUserActions";

const LoginSchema = z.object({
  email: z
    .string({ required_error: "The field is required" })
    .email({ message: "Please enter a valid email address" })
    .min(10, "Minimun 10 characters")
    .max(30, "Maximun 30 characters"),
  password: z
    .string({ required_error: "The field is required" })
    .min(6, "It must have at least 6 characters"),
});

export default function LoginScreen() {
  const { login } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data) => {
    console.log(JSON.stringify(data));

    AuthServices.loginUser(data).then((res) => {
      login(res);
      router.replace("(tabs)");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyTinerary</Text>

      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={onChange}
              value={value}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChange}
              value={value}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleLogin)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/auth/RegisterScreen")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#673AB7",
    borderRadius: 5,
    padding: 10,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  link: {
    color: "blue",
    marginTop: 20,
    fontSize: 16,
  },
});
