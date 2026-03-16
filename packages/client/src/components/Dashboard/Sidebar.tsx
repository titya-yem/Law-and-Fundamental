import type { userType } from '@/types/UserTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Fetch from '../Fetch';
import { Box, Text } from '@radix-ui/themes';
import logo from '@/assets/Logo.jpg';
import { sidebarLists } from '@/constants/SidebarLists';
import logoutSVG from '@/assets/logout.svg';
import { useLogout } from '@/hooks/useLogout';
import { NavLink } from 'react-router-dom';

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

  const logout = useLogout();

  if (isLoading || isError)
    return <Fetch isloading={isLoading} isError={isError} />;

  return (
    <>
      {/* Overlay (for mobile) */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/10 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen lg:w-80 shrink-0 rounded-r-lg bg-gray-900 text-white
          transform transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        <div className="grid grid-rows-2">
          <div className="flex flex-col justify-center lg:flex-row items-center py-4 px-3">
            <img
              src={logo}
              alt="Logo"
              className="h-12 rounded-full object-cover border border-gray-700"
            />

            <Box className="lg:pl-2 *:font-medium">
              <h4 className="text-lg lg:text-base">{data?.userName}</h4>
              <Text as="p" className="text-sm">
                Email: <Text>{data?.email}</Text>
              </Text>
              <Text as="p" className="text-sm">
                Role:
                <Text className="uppercase underline underline-offset-2">
                  {data?.role}
                </Text>
              </Text>
            </Box>
          </div>

          <Box className="space-y-2">
            {sidebarLists.map(({ img, label, link }) => (
              <NavLink
                key={label}
                to={link}
                end={link === '/dashboard'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 lg:text-sm px-4 py-3 mx-3 rounded-xl transition
                  ${
                    isActive
                      ? 'text-xl bg-gray-200 text-purple-600 font-medium'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute -left-3 w-1.5 h-12 bg-purple-500 rounded-r-lg"></span>
                    )}
                    <img
                      src={img}
                      alt={`${label} logo`}
                      className={`w-5 ${isActive ? 'w-6 text-base' : 'invert-100'}`}
                    />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </Box>
        </div>

        <button
          onClick={logout}
          className="absolute bottom-6 left-4 w-73 flex gap-x-3 px-4 py-3 rounded-xl transition  hover:bg-gray-800 cursor-pointer"
        >
          <img src={logoutSVG} alt="logout svg" className="w-5 invert-100" />
          <Text as="p">Logout</Text>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
