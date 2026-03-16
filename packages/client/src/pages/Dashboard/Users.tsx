import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router';
import axios from 'axios';
import { Box, Container, Text } from '@radix-ui/themes';

import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import Pagination from '@/components/Dashboard/Pagination';
import IsFetching from '@/components/IsFetching';
import DashboardUsersRow from '@/components/Dashboard/DashboardUserRows';

import type { Users } from '@/types/UserTypes';
import UsersButton from '@/components/Dashboard/UsersButton';

const USERS_PER_PAGE = 8;

type LayoutContext = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
};

const Users = () => {
  const { sidebarOpen, setSidebarOpen } = useOutletContext<LayoutContext>();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'admin' | 'user'>('all');

  /* FETCH USERS */
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<Users[]> => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth`,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  console.log(users);

  /* FILTER BY ROLE */
  const filteredUsers = useMemo(() => {
    if (filter === 'all') return users;
    return users.filter((u) => u.role === filter);
  }, [users, filter]);

  /* SEARCH */
  const searchedUsers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return filteredUsers;

    return filteredUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }, [filteredUsers, searchTerm]);

  const userCount = searchedUsers.length;

  /* PAGINATION */
  const totalPages = Math.max(1, Math.ceil(userCount / USERS_PER_PAGE));

  const page =
    searchTerm.trim() || filter !== 'all'
      ? 1
      : Math.min(currentPage, totalPages);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * USERS_PER_PAGE;
    return searchedUsers.slice(start, start + USERS_PER_PAGE);
  }, [searchedUsers, page]);

  if (isLoading || isError)
    return <IsFetching isLoading={isLoading} isError={isError} />;

  return (
    <>
      <DashboardHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        caseCount={userCount}
        title="Users"
      />

      <Container className="px-4 lg:px-12">
        <UsersButton setFilter={setFilter} />

        <div className="md:h-130 lg:h-127.5 flex flex-col justify-between rounded-lg shadow-md p-2 bg-white">
          <Box className="overflow-auto lg:overflow-hidden">
            {/* TABLE HEADER */}
            <div className="hidden md:grid grid-cols-[80px_1fr_2fr_100px_100px_150px] lg:grid-cols-[120px_1fr_1fr_135px_220px_150px] text-center p-3 *:font-medium border-b border-gray-300">
              <Text>ID</Text>
              <Text>Name</Text>
              <Text>Email</Text>
              <Text>Role</Text>
              <Text>Created</Text>
              <Text>Edit</Text>
            </div>

            {/* ROWS */}
            {paginatedUsers.map((user) => (
              <DashboardUsersRow key={user.id} item={user} />
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

export default Users;
