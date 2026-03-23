import { useBackup } from '@/hooks/useBackUp';
import { Box, Button, Card } from '@radix-ui/themes';

const BackUpBoard = () => {
  const backupMutation = useBackup();

  const handleDownload = () => {
    backupMutation.mutate();
  };

  return (
    <Box className="mx-auto lg:mx-0 shadow-md max-w-60">
      <Card>
        <div className="flex flex-col items-center p-2">
          <Button onClick={handleDownload} disabled={backupMutation.isPending}>
            {backupMutation.isPending
              ? 'Creating Backup...'
              : 'Download Backup'}
          </Button>
        </div>
      </Card>
    </Box>
  );
};

export default BackUpBoard;
