import IsFetching from '@/components/IsFetching';
import type { userType } from '@/types/UserTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';

import logo from '@/assets/Logo.jpg';
import toggle from '@/assets/Toggle.svg';

const Profile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<userType> => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/me`,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  <IsFetching isLoading={isLoading} isError={isError} />;

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Law and Fundamental Local Meditiation Office Logo"
            className="w-12"
          />
        </Link>
        <img src={toggle} alt="toggle button" className="w-6" />
      </div>

      <div className="py-4">
        <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
        <p className="text-sm text-purple-600 font-medium">
          Welcome {data?.userName}
        </p>
      </div>
    </div>
  );
};

export default Profile;
