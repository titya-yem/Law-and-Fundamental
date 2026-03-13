import type { SearchBarProps } from '@/types/DashboardTypes';
import { Box } from '@radix-ui/themes';

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className={'relative'}>
      <input
        type="text"
        placeholder="Search by case number or title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-74 md:w-82 lg:w-96 px-4 py-3 pr-10 *:text-sm border rounded-full outline-none shadow-sm focus:ring-2 focus:ring-blue-500"
      />

      <Box className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </Box>
    </div>
  );
};

export default SearchBar;
