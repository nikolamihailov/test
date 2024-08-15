import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/users/userService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";

export const useRegister = () => {
  const navigateTo = useNavigate();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: (userData: User) => register(userData),
    onSuccess: (response: User) => {
      toast.success(`User ${response.email} created!`);
      navigateTo("/login");
    },
    onError: (error: AxiosError) => {
      console.log(error);
      if (error?.response?.status === 409) {
        toast.error("Email is already used!");
      } else {
        toast.error("Something went wrong");
      }
      /* if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        Object.keys(apiErrors).forEach((key) => {
          setError(key as keyof User, {
            type: "manual",
            message: apiErrors[key],
          });
        });
      } else {
        toast.error("Something went wrong");
      } */
    },
  });
};
