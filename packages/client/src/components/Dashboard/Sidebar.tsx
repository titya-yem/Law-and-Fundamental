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
      {/* Overlay for mobile */}
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
          h-full w-64
          bg-gray-900 text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 font-bold text-lg border-b border-blue-800 flex flex-col gap-2">
          <span>Dashboard</span>
          {/* User info */}
          {isLoading && (
            <span className="text-sm font-normal">Loading user...</span>
          )}
          {isError && (
            <span className="text-sm font-normal text-red-500">
              Failed to load user
            </span>
          )}
          {data && (
            <span className="text-sm font-normal text-gray-300">
              Hello, {data.name}
            </span>
          )}
        </div>

        {/* Navigation */}
        <ul className="p-4 space-y-3">
          <li
            className="cursor-pointer hover:text-blue-300"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </li>
          <li
            className="cursor-pointer hover:text-blue-300"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </li>
          <li
            className="cursor-pointer hover:text-blue-300"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
