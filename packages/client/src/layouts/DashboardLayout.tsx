import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import { Outlet } from 'react-router';
import toggle from '@/assets/Toggle.svg';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div>
        {/* Toggle Button (right side) */}
        <div className="flex justify-end py-4 pr-4 lg:hidden">
          <button
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <img src={toggle} alt="toggle" className="w-7 h-7" />
          </button>
        </div>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
