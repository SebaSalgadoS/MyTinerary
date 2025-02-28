import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from "../../utils/storage";

const API_URL = "https://mytinerary-server.onrender.com/api/auth";

const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(API_URL + "/login", { email, password });
    storage.setItem({ key: "token", value: response.token });
    return response.data;
  } catch (error) {
    console.error("Error login:", error.response?.data || error.message);
    return null;
  }
};

const loginWithToken = async (token) => {
  try {
    const { data } = await axios.post(
      API_URL + "/token",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data.data
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error register:", error.response?.data || error.message);
    throw error;
  }
};

const validateToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token stored");

    const response = await axios.post(
      `${API_URL}/token`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error validation token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default {
  loginUser,
  loginWithToken,
  registerUser,
  validateToken,
};
