import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface APIError {
  response?: { data: { message: string } };
  message?: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return async (email: string, password: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      queryClient.invalidateQueries({ queryKey: ["auth"] });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error: unknown) {
        const err = error as APIError;
        console.error("Login failed:", err.response?.data?.message ?? err.message);
    }
  };
};