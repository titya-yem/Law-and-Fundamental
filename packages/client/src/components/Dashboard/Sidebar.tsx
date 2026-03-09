import type { userType } from '@/types/UserTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  const { data, isLoading, isError } = useQuery<userType>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/me`,
        { withCredentials: true }
      );
      return res.data;
    },

    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {/* Overlay (for mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/10 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-full w-72
          bg-gray-900 text-white
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="p-6 font-bold text-lg">Dashboard</div>

        <ul className="p-4 space-y-3">
          <li className="cursor-pointer hover:text-blue-300">Dashboard</li>
          <li className="cursor-pointer hover:text-blue-300">Settings</li>
          <li className="cursor-pointer hover:text-blue-300">Profile</li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
