import { useState } from 'react';
import { useBackup } from '@/hooks/useBackUp';
import { Box, Button, Card, Select } from '@radix-ui/themes';

const BackUpBoard = () => {
  const [format, setFormat] = useState<'sql' | 'dump'>('sql');

  const backupMutation = useBackup();

  const handleDownload = () => {
    backupMutation.mutate(format);
  };

  return (
    <Box className="mx-auto lg:mx-0 shadow-md max-w-60">
      <Card>
        <div className="flex flex-col items-center lg:items-start gap-y-4 p-6">
          <Select.Root
            value={format}
            onValueChange={(value: 'sql' | 'dump') => setFormat(value)}
          >
            <Select.Trigger className="w-full mb-4" />

            <Select.Content>
              <Select.Group>
                <Select.Label>Select backup format</Select.Label>
                <Select.Separator />

                <Select.Item value="sql">SQL (.sql)</Select.Item>
                <Select.Item value="dump">Custom (.dump)</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>

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
