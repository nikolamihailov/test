import axios from "axios";
import { User } from "../../types/User";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const userEndpoints = {
  login: BASE_URL + "/auth/login",
  register: BASE_URL + "/user",
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  return (
    await axios.post(userEndpoints.login, {
      email,
      password,
    })
  ).data;
};

export const register = async (userData: User) => {
  return (await axios.post(userEndpoints.register, { ...userData })).data;
};
