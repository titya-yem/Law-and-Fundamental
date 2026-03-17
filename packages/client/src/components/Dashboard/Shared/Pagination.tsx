// Pagination.tsx
import { Button, Text } from '@radix-ui/themes';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex w-full items-center justify-center md:justify-end gap-3 pt-4 pb-2 md:pr-6">
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <Text size="2">
        Page {currentPage} of {totalPages}
      </Text>

      <Button
        variant="soft"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
