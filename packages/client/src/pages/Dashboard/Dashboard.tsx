import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router';
import axios from 'axios';
import { Box, Container, Text } from '@radix-ui/themes';

import Pagination from '@/components/Dashboard/Pagination';
import IsFetching from '@/components/IsFetching';
import DashboardRow from '@/components/Dashboard/DashboardRow';
import type { Case } from '@/types/DashboardTypes';
import ActionButtons from '@/components/Dashboard/ActionButtons';

const CASES_PER_PAGE = 10;

type LayoutContext = {
  searchTerm: string;
  setCaseCount: (count: number) => void;
};

const fetchCases = async (): Promise<Case[]> => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/case/getAll`,
    { withCredentials: true }
  );

  return Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
};

const Dashboard = () => {
  const { searchTerm, setCaseCount } = useOutletContext<LayoutContext>();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: cases = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cases'],
    queryFn: fetchCases,
  });

  const filteredCases = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return cases;

    return cases.filter(
      (c) =>
        c.case_number?.toLowerCase().includes(term) ||
        c.title?.toLowerCase().includes(term)
    );
  }, [cases, searchTerm]);

  useEffect(() => {
    setCaseCount(filteredCases.length);
  }, [filteredCases.length, setCaseCount]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCases.length / CASES_PER_PAGE)
  );

  const page = searchTerm.trim() ? 1 : Math.min(currentPage, totalPages);

  const paginatedCases = useMemo(() => {
    const start = (page - 1) * CASES_PER_PAGE;
    return filteredCases.slice(start, start + CASES_PER_PAGE);
  }, [filteredCases, page]);

  if (isLoading || isError) {
    return <IsFetching isLoading={isLoading} isError={isError} data={cases} />;
  }

  return (
    <Container className="px-4 lg:px-12">
      <ActionButtons />
      <Box className="rounded-lg shadow-md p-4 bg-white">
        <Box className="overflow-auto lg:overflow-hidden">
          {/* HEADER */}
          <div className="hidden text-center p-4 lg:grid grid-cols-7 border-b border-gray-300">
            <Text>Case #</Text>
            <Text>Title</Text>
            <Text>Content</Text>
            <Text>Status</Text>
            <Text>Start Date</Text>
            <Text>Finished Date</Text>
            <Text>Update</Text>
          </div>

          {/* ROWS */}
          {paginatedCases.map((item) => (
            <DashboardRow key={item.id} item={item} />
          ))}
        </Box>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
