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
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/me`, 
          { withCredentials: true});

        return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("AUTH ERROR:", error.response?.data);
        throw error;
      }
    },
  });
};