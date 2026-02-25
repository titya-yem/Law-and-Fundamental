import type { SearchBarProps } from '@/types/DashboardTypes';
import { Box, TextField } from '@radix-ui/themes';

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-62.5 md:w-80">
      <TextField.Root
        placeholder="Search by case number or title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <Box className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </Box>
      </TextField.Root>
    </div>
  );
};

export default SearchBar;
