import { Badge, Button, Dialog, Text } from '@radix-ui/themes';
import DashboardUpdate from '@/components/Dashboard/DashboardUpdate';
import type { Case } from '@/types/DashboardTypes';

type Props = {
  item: Case;
};

const formatDate = (date?: string | null) =>
  date ? new Date(date).toLocaleDateString() : '-';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'cyan';
    case 'close':
      return 'crimson';
    default:
      return 'orange';
  }
};

const DashboardRow = ({ item }: Props) => {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-2 items-center p-2 border-b border-gray-200 text-center *:text-sm xl:gap-0">
      <Text>{item.case_number}</Text>

      <Text className="truncate">{item.title}</Text>

      {/* CONTENT */}
      <Dialog.Root>
        <Dialog.Trigger>
          <div>
            <Button color="amber">View</Button>
          </div>
        </Dialog.Trigger>

        <Dialog.Content size="2" maxWidth="400px">
          <Text as="p" size="2">
            {item.content}
          </Text>
        </Dialog.Content>
      </Dialog.Root>

      {/* STATUS */}
      <Badge size="2" className="mx-auto" color={getStatusColor(item.status)}>
        {item.status}
      </Badge>

      <Text>{formatDate(item.start_date)}</Text>

      <Text>{formatDate(item.finished_date)}</Text>

      {/* UPDATE */}

      <div>
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
    </div>
  );
};

export default DashboardRow;
