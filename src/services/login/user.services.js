import axios from "axios";
import { userMapper } from "./user.mapper";
import storage from "../utils/storage";
const URL = "https://mytinerary-server.onrender.com/api"

const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(URL + "/auth/login", { email, password });
    const user = userMapper(data.data);
    storage.setItem({ key: "token", value: user.token });
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const loginWithToken = async (token) => {
  try {
    const { data } = await axios.post(
      URL + "/auth/token",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return userMapper(data.data);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default {
  login,
  loginWithToken,
};