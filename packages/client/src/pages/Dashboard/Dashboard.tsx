import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Badge, Box, Button, Container, Dialog, Text } from '@radix-ui/themes';

import SearchBar from '@/components/Dashboard/SearchBar';
import Pagination from '@/components/Dashboard/Pagination';
import IsFetching from '@/components/IsFetching';
import type { Case } from '@/types/DashboardTypes';
import DashboardUpdate from '@/components/Dashboard/DashboardUpdate';

const CASES_PER_PAGE = 10;

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: cases = [],
    isLoading,
    isError,
  } = useQuery<Case[]>({
    queryKey: ['cases'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/case/getAll`,
        { withCredentials: true }
      );
      return Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
    },
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const filteredCases = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return cases.filter(
      (c) =>
        c.case_number.toLowerCase().includes(term) ||
        c.title.toLowerCase().includes(term)
    );
  }, [cases, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCases.length / CASES_PER_PAGE)
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedCases = useMemo(() => {
    const start = (safeCurrentPage - 1) * CASES_PER_PAGE;
    return filteredCases.slice(start, start + CASES_PER_PAGE);
  }, [filteredCases, safeCurrentPage]);

  if (isLoading || isError)
    return <IsFetching isLoading={isLoading} isError={isError} data={cases} />;

  return (
    <Container className="px-4">
      <Box className="rounded-lg shadow-md p-4 bg-white">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="*:text-center *:pb-1">
            <h2 className="text-2xl font-semibold">Cases</h2>
            <p className="text-sm text-gray-500">
              {filteredCases.length} Cases Found
            </p>
          </div>

          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </div>

        {/* TABLE */}
        <Box className="overflow-auto lg:overflow-hidden">
          <div className="">
            {/* Header Row */}
            <div className="hidden xl:grid xl:grid-cols-[100px_250px_170px_150px_150px_120px] 2xl:grid-cols-[150px_300px_200px_180px_150px_150px] border-b border-gray-300 p-4 text-center">
              <Text>Case #</Text>
              <Text>Title</Text>
              <Text>Content</Text>
              <Text>Status</Text>
              <Text>Start Date</Text>
              <Text>Finished Date</Text>
              <Text>Update</Text>
            </div>

            {/* Data Rows */}
            {paginatedCases.map((item) => {
              const startDate = new Date(item.start_date).toLocaleDateString();
              const finishedDate = item.finished_date
                ? new Date(item.finished_date).toLocaleDateString()
                : '-';

              return (
                <div
                  key={item.id}
                  className="grid md:grid-cols-3 gap-2 p-4 border-b text-center xl:grid-cols-[100px_250px_170px_150px_150px_120px] 2xl:grid-cols-[150px_300px_200px_180px_150px_150px] *:text-sm *:font-medium xl:gap-0 xl:border-none"
                >
                  <Text>{item.case_number}</Text>
                  <Text className="truncate">{item.title}</Text>

                  {/* Content Dialog */}
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <Button size="1" variant="soft">
                        View
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content size="2" maxWidth="400px">
                      <Text as="p" size="2">
                        {item.content}
                      </Text>
                    </Dialog.Content>
                  </Dialog.Root>

                  {/* Status Badge */}
                  <Badge
                    size="2"
                    className="mx-auto"
                    color={
                      item.status === 'open'
                        ? 'cyan'
                        : item.status === 'close'
                          ? 'crimson'
                          : 'orange'
                    }
                  >
                    {item.status}
                  </Badge>

                  <Text>{startDate}</Text>
                  <Text>{finishedDate}</Text>

                  {/* UPDATE */}
                  <DashboardUpdate
                    caseItem={{
                      id: item.id,
                      caseNumber: item.case_number,
                      title: item.title,
                      content: item.content,
                      status: item.status,
                      startDate: item.start_date,
                      finishedDate: item.finished_date,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Box>

        {/* PAGINATION */}
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
