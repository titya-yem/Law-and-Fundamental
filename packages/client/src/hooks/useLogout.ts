import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {}, { withCredentials: true }); // call backend
      queryClient.clear(); // clear React Query cache
      globalThis.location.href = "/"; // redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
};