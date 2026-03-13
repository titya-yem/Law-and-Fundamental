import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router';
import axios from 'axios';
import { Badge, Box, Button, Container, Dialog, Text } from '@radix-ui/themes';

import Pagination from '@/components/Dashboard/Pagination';
import IsFetching from '@/components/IsFetching';
import DashboardUpdate from '@/components/Dashboard/DashboardUpdate';
import type { Case } from '@/types/DashboardTypes';

const CASES_PER_PAGE = 10;

type LayoutContext = {
  searchTerm: string;
  setCaseCount: (count: number) => void;
};

const Dashboard = () => {
  const { searchTerm, setCaseCount } = useOutletContext<LayoutContext>();
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

  /* FILTER */
  const filteredCases = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return cases.filter(
      (c) =>
        c.case_number?.toLowerCase().includes(term) ||
        c.title?.toLowerCase().includes(term)
    );
  }, [cases, searchTerm]);

  /* UPDATE HEADER COUNT */
  useEffect(() => {
    setCaseCount(filteredCases.length);
  }, [filteredCases, setCaseCount]);

  /* PAGINATION */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCases.length / CASES_PER_PAGE)
  );

  const safeCurrentPage =
    searchTerm.trim().length > 0 ? 1 : Math.min(currentPage, totalPages);

  const paginatedCases = useMemo(() => {
    const start = (safeCurrentPage - 1) * CASES_PER_PAGE;
    return filteredCases.slice(start, start + CASES_PER_PAGE);
  }, [filteredCases, safeCurrentPage]);

  if (isLoading || isError) {
    return <IsFetching isLoading={isLoading} isError={isError} data={cases} />;
  }

  return (
    <Container className="px-4 lg:px-12">
      <Box className="rounded-lg shadow-md p-4 bg-white">
        {/* TABLE */}
        <Box className="overflow-auto lg:overflow-hidden">
          {/* TABLE HEADER */}
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
          {paginatedCases.map((item) => {
            const startDate = new Date(item.start_date).toLocaleDateString();

            const finishedDate = item.finished_date
              ? new Date(item.finished_date).toLocaleDateString()
              : '-';

            return (
              <div
                key={item.id}
                className="grid md:grid-cols-3 lg:grid-cols-7 gap-2 p-4 border-b text-center *:text-sm *:font-medium xl:gap-0 xl:border-none"
              >
                <Text>{item.case_number}</Text>
                <Text className="truncate">{item.title}</Text>

                {/* CONTENT */}
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

                {/* STATUS */}
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
