import axios from "axios";
import { LoggedUser, User } from "../../types/User";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

const userEndpoints = {
  login: BASE_URL + "/auth/login",
  loggedInUser: BASE_URL + "/auth/logged-in",
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
  return (await axios.post(userEndpoints.register, userData)).data;
};

export const fetchLoggedInUser = async (token: string) => {
  const response = await axios.get<LoggedUser>(userEndpoints.loggedInUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
