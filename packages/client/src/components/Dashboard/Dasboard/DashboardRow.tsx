import { Badge, Button, Dialog, Flex, Text } from '@radix-ui/themes';
import DashboardUpdate from '@/components/Dashboard/Dasboard/DashboardUpdate';
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
    <div className="grid md:grid-cols-[80px_75px_90px_90px_120px_120px_80px] lg:grid-cols-7 items-center gap-2 p-2 border-b border-gray-200 text-center text-sm">
      <Text>{item.case_number}</Text>

      <Text className="truncate">{item.title}</Text>

      {/* CONTENT */}
      <Dialog.Root>
        <Dialog.Trigger>
          <div>
            <Button color="amber">View</Button>
          </div>
        </Dialog.Trigger>

        <Dialog.Content size="3" maxWidth="500px">
          <Flex direction="column" gapY="1">
            <Text weight="bold" size="4">
              Title: {item.title}
            </Text>

            <Flex align="center" gap="4" className="border-b-2">
              <Text size="1" weight="medium">
                Case Number: {item.case_number}
              </Text>
              <Badge color={getStatusColor(item.status)}>{item.status}</Badge>
            </Flex>

            <div
              className="text-sm md:text-base prose max-w-none py-2 prose-ol:list-decimal prose-ol:pl-5"
              dangerouslySetInnerHTML={{ __html: item.content || '' }}
            />

            <Flex
              align="center"
              gap="4"
              className="text-sm border-t-2 text-gray-500"
            >
              <Text>Start: {formatDate(item.start_date)}</Text>
              <Text>Finished: {formatDate(item.finished_date)}</Text>
            </Flex>
          </Flex>
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
