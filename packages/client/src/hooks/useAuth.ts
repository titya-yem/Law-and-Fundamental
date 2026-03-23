import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface User {
  id: number;
  role: string;
}

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/me`,
        { withCredentials: true }
      );
      return res.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};