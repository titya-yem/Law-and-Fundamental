import type { userType } from '@/types/UserTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Fetch from '../Fetch';
import { Box, Text } from '@radix-ui/themes';
import logo from '@/assets/Logo.jpg';
import { sidebarLists } from '@/constants/SidebarLists';
import { Link } from 'react-router-dom';

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

  console.log(data);

  if (isLoading || isError) {
    return <Fetch isloading={isLoading} isError={isError} />;
  }

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
        className={`fixed lg:static top-0 left-0 h-full w-68 bg-gray-900 text-white
          transform transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        <div className="flex flex-col ">
          <div className="py-4 px-3">
            <img
              src={logo}
              alt="Profile Picture"
              className="h-14 mb-4 mx-auto rounded-full"
            />

            <Box className="*:font-medium">
              <h4 className="text-lg">{data?.userName}</h4>
              <Text as="p" className="text-sm">
                Email: <Text>{data?.email}</Text>
              </Text>
              <Text as="p" className="text-sm">
                Role: <Text className="uppercase">{data?.role}</Text>
              </Text>
            </Box>
          </div>

          <div>
            {sidebarLists.map(({ img, label, link }) => (
              <Link
                key={label}
                to={link}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 hover:bg-gray-800"
              >
                <img
                  src={img}
                  alt={`${label} logo`}
                  className="w-5 invert-100"
                />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
