import type { SearchBarProps } from '@/types/DashboardTypes';
import { Box, TextField } from '@radix-ui/themes';

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-68 md:w-80">
      <TextField.Root
        radius="large"
        placeholder="Search by case number or title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-4"
      >
        <Box className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </Box>
      </TextField.Root>
    </div>
  );
};

export default SearchBar;
