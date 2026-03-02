import Footer from '@/components/Footer';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default DashboardLayout;
