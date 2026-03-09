import type { userType } from '@/types/UserTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Fetch from '../Fetch';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import logo from '@/assets/Logo.jpg';

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

  <Fetch isloading={isLoading} isError={isError} />;

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
        <Flex justify="between" align="center" gapX="6" p="4">
          <img src={logo} alt="Profile Picture" className="h-11 rounded-full" />

          <Box className="*:font-medium">
            <h4 className="text-base">{data?.userName}</h4>
            <Text as="p" className="text-sm">
              Email: <Text>{data?.email}</Text>
            </Text>
            <Text as="p">
              Role: <Text className="uppercase">{data?.role}</Text>
            </Text>
          </Box>
        </Flex>

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
