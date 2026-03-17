import { Link } from 'react-router';
import toggle from '@/assets/Toggle.svg';
import SearchBar from '@/components/Dashboard/SearchBar';
import logo from '@/assets/Logo.jpg';

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  caseCount: number;
  placeholder: string;
  title: string;
};

const DashboardHeader = (prop: Props) => {
  const handleSearchChange = (value: string) => {
    prop.setSearchTerm(value);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center px-4 py-4 md:py-8 lg:px-12 gap-3">
      {/* Mobile */}
      <div className="flex flex-col items-center md:hidden gap-2">
        <div className="flex w-full justify-between items-center">
          <SearchBar
            value={prop.searchTerm}
            placeholder={prop.placeholder}
            onChange={handleSearchChange}
          />

          <button
            aria-label="Toggle sidebar"
            onClick={() => prop.setSidebarOpen(!prop.sidebarOpen)}
            className="ml-2"
          >
            <img src={toggle} alt="toggle" className="w-7 h-7" />
          </button>
        </div>

        <div className="py-2">
          <h2 className="text-2xl font-semibold text-gray-900">{prop.title}</h2>
          <p className="text-sm text-purple-600 font-medium text-center">
            {prop.caseCount} {prop.title} Found
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex w-full items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-900">{prop.title}</h2>
          <p className="text-sm lg:text-base text-purple-600 font-medium">
            {prop.caseCount} {prop.title} Found
          </p>
        </div>

        <div className="flex-1 flex justify-center px-4">
          <SearchBar
            value={prop.searchTerm}
            placeholder={prop.placeholder}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex-1 flex justify-end">
          <button
            aria-label="Toggle sidebar"
            onClick={() => prop.setSidebarOpen(!prop.sidebarOpen)}
            className="hidden md:flex lg:hidden"
          >
            <img src={toggle} alt="toggle" className="w-7 h-7" />
          </button>

          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="hidden lg:flex h-12 rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
