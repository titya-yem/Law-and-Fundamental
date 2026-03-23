import IsFetching from '@/components/IsFetching';
import { Link, useOutletContext } from 'react-router';

import logo from '@/assets/Logo.jpg';
import toggle from '@/assets/Toggle.svg';
import { Text } from '@radix-ui/themes';
import ProfileCard from '@/components/Dashboard/Profile/ProfileCard';
import { useAuth } from '@/hooks/useAuth';

type LayoutContext = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
};

const Profile = () => {
  const { sidebarOpen, setSidebarOpen } = useOutletContext<LayoutContext>();

  const { data: user, isLoading, isError } = useAuth();

  if (isLoading || isError || !user) {
    return <IsFetching isLoading={isLoading} isError={isError} />;
  }

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Law and Fundamental Local Meditiation Office Logo"
            className="w-12 rounded-full"
          />
        </Link>

        <button
          aria-label="Toggle sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          <img src={toggle} alt="toggle button" className="w-6" />
        </button>
      </div>

      <div className="py-4 *:text-center lg:*:text-left">
        <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
        <p className="font-medium text-purple-600">
          Welcome{' '}
          <Text as="span" className="underline underline-offset-2">
            {user.name}
          </Text>
        </p>
      </div>

      <div>
        <ProfileCard {...user} />
      </div>
    </div>
  );
};

export default Profile;
