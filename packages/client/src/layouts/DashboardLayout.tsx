import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f4f6] lg:flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1">
        <Outlet context={{ sidebarOpen, setSidebarOpen }} />
      </div>
    </div>
  );
};

export default DashboardLayout;
