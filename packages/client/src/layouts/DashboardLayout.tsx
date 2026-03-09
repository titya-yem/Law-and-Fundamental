import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router';
import { Button } from '@radix-ui/themes';
import toggle from '@/assets/Toggle.svg';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 p-4">
          {/* Toggle Button (usually mobile only) */}
          <Button
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="mb-4 lg:hidden bg-blue-900 text-white"
          >
            <img src={toggle} alt="" className="w-5 h-5" />
          </Button>

          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
