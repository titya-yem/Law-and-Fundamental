import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await api.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`
      );

      queryClient.removeQueries({ queryKey: ['me'] });

      toast.success('Logged out successfully');
    } catch {
      toast.error('Logout failed');
    }
  };

  return handleLogout;
};