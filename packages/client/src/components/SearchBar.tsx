import type { searchBarProps } from '@/types/DashboardTypes';
import { TextField } from '@radix-ui/themes';

const SearchBar = ({ value, onChange }: searchBarProps) => {
  return (
    <div className="relative w-full md:w-80">
      <TextField.Root
        size="3"
        placeholder="Search by case number or title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </div>
    </div>
  );
};

export default SearchBar;
