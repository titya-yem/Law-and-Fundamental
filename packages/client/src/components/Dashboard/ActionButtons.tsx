import { Box, Button } from '@radix-ui/themes';
import AddCase from './AddCase';

const ActionButtons = () => {
  return (
    <section className="flex justify-between items-center mb-4">
      <div className="flex justify-between items-center gap-x-1 md:gap-x-2">
        <Button>All Cases</Button>
        <Button>Finished</Button>
        <Button>Status</Button>
      </div>

      <Box>
        <AddCase />
      </Box>
    </section>
  );
};

export default ActionButtons;
