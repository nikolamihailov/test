import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/users/userService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type UserData = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const { loginUser } = useAuth();
  const navigateTo = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (userData: UserData) => login(userData),
    onSuccess: (response: { token: string }) => {
      loginUser(response.token);

      toast.success("Login successful!");

      const redirectPath = new URLSearchParams(location.search).get("continue") || "/home";
      navigateTo(redirectPath);
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400 || error.response?.status === 403) {
        toast.error("Email or password is invalid");
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
