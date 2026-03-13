import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import { Outlet } from 'react-router';
import toggle from '@/assets/Toggle.svg';
import SearchBar from '@/components/Dashboard/SearchBar';
import logo from '@/assets/Logo.jpg';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [caseCount, setCaseCount] = useState(0);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] lg:flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center px-4 py-4 md:py-8 lg:px-12 gap-3">
          <div className="flex flex-col items-center md:hidden gap-2">
            <div className="flex w-full justify-between items-center">
              <SearchBar value={searchTerm} onChange={handleSearchChange} />
              <button
                aria-label="Toggle sidebar"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="block ml-2"
              >
                <img src={toggle} alt="toggle" className="w-7 h-7" />
              </button>
            </div>

            <div className="py-2">
              <h2 className="text-2xl font-semibold text-gray-900">Cases</h2>
              <p className="text-sm text-purple-600 font-medium text-center">
                {caseCount} Cases Found
              </p>
            </div>
          </div>

          <div className="hidden md:flex w-full items-center">
            {/* LEFT: Case count / header */}
            <div className="flex-1 text-left">
              <h2 className="text-2xl font-semibold text-gray-900">Cases</h2>
              <p className="text-sm lg:text-base text-purple-600 font-medium">
                {caseCount} Cases Found
              </p>
            </div>

            {/* SearchBar */}
            <div className="flex-1 flex justify-center px-4">
              <SearchBar value={searchTerm} onChange={handleSearchChange} />
            </div>

            <div className="flex-1 flex justify-end">
              <button
                aria-label="Toggle sidebar"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden md:flex lg:hidden"
              >
                <img src={toggle} alt="toggle" className="w-7 h-7" />
              </button>

              <img
                src={logo}
                alt="Logo"
                className="hidden lg:flex h-12 rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <main>
          <Outlet context={{ searchTerm, setCaseCount }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
