import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

const DeleteCaseButton = ({ caseId }: { caseId: number }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const deleteCase = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/case/delete/${caseId}`,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      setOpen(false);
    },
  });

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>
        <Button type="button" color="red" variant="soft">
          Delete
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Delete Case</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to permanently delete this case? This action
          cannot be undone.
        </AlertDialog.Description>

        <Flex gap="3" justify="end" mt="4">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <Button
              color="red"
              onClick={() => deleteCase.mutate()}
              disabled={deleteCase.isPending}
            >
              {deleteCase.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteCaseButton;
