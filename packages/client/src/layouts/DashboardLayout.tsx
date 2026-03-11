import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import { Outlet } from 'react-router';
import { Button } from '@radix-ui/themes';
import toggle from '@/assets/Toggle.svg';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Mobile toggle */}
        <Button
          aria-label="Toggle sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-6 lg:hidden"
        >
          <img src={toggle} alt="toggle" className="w-5 h-5" />
        </Button>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
