import { Box, Button, DropdownMenu } from '@radix-ui/themes';
import AddCase from './AddCase';
import type { CaseFilter } from '@/types/CaseType';

type Props = {
  setFilter: (value: CaseFilter) => void;
};

const ActionButtons = ({ setFilter }: Props) => {
  return (
    <section className="flex justify-between items-center mb-4">
      <div className="flex justify-between items-center gap-x-1 md:gap-x-2">
        <Button onClick={() => setFilter('all')}>All Cases</Button>

        <Button onClick={() => setFilter('finished')}>Finished</Button>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              Status
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => setFilter('open')}>
              Open
            </DropdownMenu.Item>

            <DropdownMenu.Item onClick={() => setFilter('ongoing')}>
              On Going
            </DropdownMenu.Item>

            <DropdownMenu.Item onClick={() => setFilter('close')}>
              Close
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      <Box>
        <AddCase />
      </Box>
    </section>
  );
};

export default ActionButtons;
