import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default MainLayout;
