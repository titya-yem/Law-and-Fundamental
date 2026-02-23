import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Dialog,
  Heading,
  Text,
} from '@radix-ui/themes';
import SearchBar from '@/components/SearchBar';
import IsFetching from '@/components/IsFetching';
import type { Case } from '@/types/DashboardTypes';

const CasesDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const casesPerPage = 10;

  /* =========================
     FETCH CASES
  ========================== */
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

  const filteredCases = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return cases.filter(
      (c) =>
        c.case_number.toLowerCase().includes(term) ||
        c.title.toLowerCase().includes(term)
    );
  }, [cases, searchTerm]);

  const totalPages = Math.ceil(filteredCases.length / casesPerPage);

  // Ensure page is always valid
  const safeCurrentPage =
    totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const paginatedCases = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * casesPerPage;

    return filteredCases.slice(startIndex, startIndex + casesPerPage);
  }, [filteredCases, safeCurrentPage]);

  if (isLoading || isError) {
    return <IsFetching isLoading={isLoading} isError={isError} data={cases} />;
  }

  return (
    <Container className="py-2 h-screen bg-cyan-50">
      <Box className="rounded-xl p-4 shadow-sm h-full flex flex-col bg-gray-50">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <Heading size="4">Cases</Heading>

          <Box>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </Box>
        </div>

        {/* TABLE */}
        <Box className="flex-1 overflow-auto">
          <div className="h-150">
            {/* HEADER ROW */}
            <div className="grid grid-cols-6 gap-2 p-3 border-b border-gray-300 text-center font-medium">
              <Text>Case #</Text>
              <Text>Title</Text>
              <Text>Content</Text>
              <Text>Status</Text>
              <Text>Start Date</Text>
              <Text>Finished Date</Text>
            </div>

            {/* DATA ROWS */}
            {paginatedCases.map((item) => {
              const startDate = new Date(item.start_date).toLocaleDateString();

              const finishedDate = item.finished_date
                ? new Date(item.finished_date).toLocaleDateString()
                : '-';

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-6 gap-2 p-3 border-b border-gray-200 text-center text-sm"
                >
                  <Text>{item.case_number}</Text>

                  <Text className="truncate">{item.title}</Text>

                  <Dialog.Root>
                    <Dialog.Trigger>
                      <Button size="1" variant="soft">
                        View
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content size="2" maxWidth="400px">
                      <Text as="p" size="3">
                        {item.content}
                      </Text>
                    </Dialog.Content>
                  </Dialog.Root>

                  <Text>{item.status}</Text>
                  <Text>{startDate}</Text>
                  <Text>{finishedDate}</Text>
                </div>
              );
            })}
          </div>
        </Box>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Box className="flex justify-end items-center gap-3 pt-4">
            <Button
              variant="soft"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            <Text size="2">
              Page {safeCurrentPage} of {totalPages}
            </Text>

            <Button
              variant="soft"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CasesDashboard;
