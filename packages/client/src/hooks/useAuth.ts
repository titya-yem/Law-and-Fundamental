import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface User {
  id: number;
  role: string;
}

export const useAuth = () => {
  return useQuery<User | null>({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/me`, {
          withCredentials: true,
        });
        return res.data;
      } catch {
        return null;
      }
    },
  });
};