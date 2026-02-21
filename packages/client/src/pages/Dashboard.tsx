import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  Box,
  Container,
  Flex,
  Heading,
  Select,
  Text,
  TextField,
} from '@radix-ui/themes';

// Type matching your cases table
interface Case {
  id: number;
  case_number: string;
  title: string;
  content: string;
  status: 'open' | 'close' | 'ongoing';
  start_date: string;
  finished_date: string | null;
}

const CasesDashboard = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch cases
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<Case[]>({
    queryKey: ['cases'],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/case/getAll`,
        { withCredentials: true }
      );

      return Array.isArray(res.data) ? res.data : res.data.data || [];
    },
  });

  console.log(data);
  // Mutation for updating status
  const updateStatus = useMutation<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    unknown,
    { id: number; status: 'open' | 'close' | 'ongoing' }
  >({
    mutationFn: async ({ id, status }) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/cases/${id}/status`,
        { status }
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cases'] }),
  });

  if (isLoading)
    return <Heading className="text-center py-10">Loading...</Heading>;
  if (isError)
    return (
      <Heading className="text-center py-10">
        Error: {(error as Error).message}
      </Heading>
    );
  if (!data.length)
    return <Heading className="text-center py-10">No Cases available</Heading>;

  // Filter cases based on search term
  const filteredCases = data.filter(
    (c) =>
      c.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Flex className="w-full h-screen gap-4 p-4">
        {/* LEFT: Cases List */}
        <Box className="w-2/3 bg-white rounded-md p-4 overflow-auto">
          {/* Search bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <Heading size="3">Cases</Heading>
            <div className="relative w-full md:w-80">
              <TextField.Root
                size="3"
                placeholder="Search by case number or title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Cases table */}
          <Box className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-2 p-2 border-b border-gray-300 text-center font-medium">
              <Text>Case #</Text>
              <Text>Title</Text>
              <Text>Content</Text>
              <Text>Status</Text>
              <Text>Start Date</Text>
              <Text>Finished Date</Text>
            </div>

            {filteredCases.map((item: Case) => {
              const startDate = new Date(item.start_date).toLocaleDateString();
              const finishedDate = item.finished_date
                ? new Date(item.finished_date).toLocaleDateString()
                : '-';

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-6 gap-2 p-2 border-b border-gray-200 text-center text-sm"
                >
                  <Text>{item.case_number}</Text>
                  <Text>{item.title}</Text>
                  <Text>{item.content}</Text>
                  <Select.Root
                    defaultValue={item.status}
                    onValueChange={(value) =>
                      updateStatus.mutate({
                        id: item.id,
                        status: value as 'open' | 'close' | 'ongoing',
                      })
                    }
                  >
                    <Select.Trigger color="orange" variant="soft" />
                    <Select.Content color="orange" position="popper">
                      <Select.Item value="open">Open</Select.Item>
                      <Select.Item value="ongoing">Ongoing</Select.Item>
                      <Select.Item value="close">Close</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <Text>{startDate}</Text>
                  <Text>{finishedDate}</Text>
                </div>
              );
            })}
          </Box>
        </Box>

        {/* RIGHT: CRUD Panel */}
        <Box className="w-[300px] bg-gray-50 rounded-md p-4">
          <Heading size="4" className="mb-4">
            CRUD Panel
          </Heading>
          <Text className="text-gray-500">
            CRUD operations will appear here.
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default CasesDashboard;
