import Sidebar from '@/components/Dashboard/Sidebar';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
