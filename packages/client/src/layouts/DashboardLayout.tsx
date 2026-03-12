import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import { Outlet } from 'react-router';
import toggle from '@/assets/Toggle.svg';
import SearchBar from '@/components/Dashboard/SearchBar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] lg:flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1">
        {/* Top Bar */}
        <div className="flex items-center justify-between lg:justify-center py-4 px-4">
          {/* SearchBar */}
          <SearchBar value={searchTerm} onChange={handleSearchChange} />

          {/* Toggle Button */}
          <button
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <img src={toggle} alt="toggle" className="w-7 h-7 lg:hidden" />
          </button>
        </div>

        <main>
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
