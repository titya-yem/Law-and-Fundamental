import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router';
import axios from 'axios';
import { Box, Container, Text } from '@radix-ui/themes';

import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import Pagination from '@/components/Dashboard/Pagination';
import IsFetching from '@/components/IsFetching';
import DashboardRow from '@/components/Dashboard/DashboardRow';
import ActionButtons from '@/components/Dashboard/ActionButtons';
import type { Case } from '@/types/DashboardTypes';

const CASES_PER_PAGE = 8;

type LayoutContext = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
};

const Dashboard = () => {
  const { sidebarOpen, setSidebarOpen } = useOutletContext<LayoutContext>();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<
    'all' | 'finished' | 'open' | 'ongoing' | 'close'
  >('all');

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<Case[]> => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth`,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  console.log(users);

  /* FILTER BY STATUS */
  const filteredByStatus = useMemo(() => {
    if (filter === 'all') return users;
    return users.filter((c) => c.status === filter);
  }, [users, filter]);

  /* SEARCH */
  const filteredCases = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return filteredByStatus;

    return filteredByStatus.filter(
      (c) =>
        c.case_number?.toLowerCase().includes(term) ||
        c.title?.toLowerCase().includes(term)
    );
  }, [filteredByStatus, searchTerm]);

  const caseCount = filteredCases.length;

  /* PAGINATION */
  const totalPages = Math.max(1, Math.ceil(caseCount / CASES_PER_PAGE));

  const page =
    searchTerm.trim() || filter !== 'all'
      ? 1
      : Math.min(currentPage, totalPages);

  const paginatedCases = useMemo(() => {
    const start = (page - 1) * CASES_PER_PAGE;
    return filteredCases.slice(start, start + CASES_PER_PAGE);
  }, [filteredCases, page]);

  if (isLoading || isError)
    return <IsFetching isLoading={isLoading} isError={isError} />;

  return (
    <>
      <DashboardHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        caseCount={caseCount}
        title="Users"
      />

      <Container className="px-4 lg:px-12">
        <ActionButtons setFilter={setFilter} />

        <div className="md:h-130 lg:h-127.5 flex flex-col items-center justify-between rounded-lg shadow-md p-2 bg-white">
          <Box className="overflow-auto lg:overflow-hidden">
            {/* HEADER */}
            <div className="hidden md:grid grid-cols-[80px_80px_100px_100px_125px_130px_80px] lg:grid-cols-6 text-center p-3 *:font-medium border-b border-gray-300">
              <Text>ID</Text>
              <Text>Name</Text>
              <Text>Email</Text>
              <Text>Role</Text>
              <Text>Created_at</Text>
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
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
