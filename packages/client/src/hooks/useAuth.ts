import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export interface User {
  id: number;
  role: string;
}

export const useAuth = () => {
  return useQuery<User | null>({
    queryKey: ['me'],
    queryFn: async () => {
      const token = Cookies.get('token');
      if (!token) return null;

      try {
        const decoded = jwtDecode<User>(token);
        return decoded;
      } catch {
        return null;
      }
    },
    staleTime: 60 * 60 * 1000, // 60 minutes
  });
};