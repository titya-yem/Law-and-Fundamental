import { Badge, Button, Text } from '@radix-ui/themes';
import type { Users } from '@/types/UserTypes';

type Props = {
  item: Users;
};

const formatDate = (date?: string | null) =>
  date ? new Date(date).toLocaleDateString() : '-';

const getRoleColor = (role: string) => {
  if (role === 'admin') return 'crimson';
  else return 'blue';
};

const DashboardUsersRow = ({ item }: Props) => {
  return (
    <div className="grid md:grid-cols-[80px_1fr_2fr_100px_90px_150px] lg:grid-cols-[120px_1fr_1fr_150px_200px_150px] items-center gap-2 p-2 border-b border-gray-200 text-center text-sm">
      <Text>{item.id}</Text>

      <Text className="truncate">{item.name}</Text>

      <Text className="truncate">{item.email}</Text>

      <div>
        <Badge color={getRoleColor(item.role)} size="2">
          {item.role}
        </Badge>
      </div>

      <Text>{formatDate(item.create_at)}</Text>

      <div>
        <Button>Edit</Button>
      </div>
    </div>
  );
};

export default DashboardUsersRow;
