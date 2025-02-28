import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function _layout() {
  return (
    <Provider store={store}>
      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="citydetail/[city]" options={{ headerShown: false }} />
      <Stack.Screen name="auth/LoginScreen" options={{ headerShown: false}} />
    </Stack>
    </Provider>
  );
}
