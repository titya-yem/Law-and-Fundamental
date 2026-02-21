import type { Case } from '@/types/DashboardTypes';
import { Heading } from '@radix-ui/themes';

interface IsFetchingProps {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  data: Case[] | undefined;
}

const IsFetching = ({ isLoading, isError, error, data }: IsFetchingProps) => {
  if (isLoading) {
    return <Heading className="text-center py-10">Loading...</Heading>;
  }

  if (isError) {
    return (
      <Heading className="text-center py-10">
        Error: {(error as Error)?.message}
      </Heading>
    );
  }

  if (!data || data.length === 0) {
    return <Heading className="text-center py-10">No Cases available</Heading>;
  }

  return null;
};

export default IsFetching;
