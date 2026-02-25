import { useState } from 'react';
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
  Select,
} from '@radix-ui/themes';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import RichTextEditor from '@/components/RichTextEditor';

import {
  caseFormSchema,
  type CaseFormValues,
  type CaseProps,
} from '@/types/CaseForm';

/* -------------------------------------------------- */
/* Helpers                                            */
/* -------------------------------------------------- */

const formatDateOnly = (date?: string | null): string =>
  date ? new Date(date).toISOString().slice(0, 10) : '';

const toISODate = (date?: string | null) =>
  date ? new Date(`${date}T00:00:00`).toISOString() : null;

/* -------------------------------------------------- */
/* Component                                          */
/* -------------------------------------------------- */

const DashboardUpdate = ({ caseItem }: CaseProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  /* ---------- React Hook Form ---------- */

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: {
      caseNumber: caseItem.caseNumber,
      title: caseItem.title,
      content: caseItem.content,
      status: caseItem.status,
      startDate: formatDateOnly(caseItem.startDate),
      finishedDate: formatDateOnly(caseItem.finishedDate),
    },
  });

  /* ---------- Mutation ---------- */

  const updateCase = useMutation({
    mutationFn: async (data: CaseFormValues) => {
      const payload = {
        ...data,
        startDate: toISODate(data.startDate),
        finishedDate: toISODate(data.finishedDate),
      };

      const { data: response } = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/case/update/${caseItem.id}`,
        payload,
        { withCredentials: true }
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      setOpen(false);
    },
  });

  const onSubmit = (data: CaseFormValues) => {
    updateCase.mutate(data);
  };

  /* -------------------------------------------------- */
  /* UI                                                 */
  /* -------------------------------------------------- */

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button size="1">Edit</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="900px">
        <Dialog.Title>Edit Case</Dialog.Title>

        <Dialog.Description>
          Update case information and content.
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Case Number */}
            <div>
              <Text weight="medium">Case Number</Text>
              <TextField.Root {...register('caseNumber')} />
              {errors.caseNumber && (
                <Text color="red">{errors.caseNumber.message}</Text>
              )}
            </div>

            {/* Title */}
            <div>
              <Text weight="medium">Title</Text>
              <TextField.Root {...register('title')} />
              {errors.title && <Text color="red">{errors.title.message}</Text>}
            </div>

            {/* Rich Text Editor */}
            <div className="col-span-2">
              <Text weight="medium">Content</Text>

              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                )}
              />

              {errors.content && (
                <Text color="red">{errors.content.message}</Text>
              )}
            </div>

            {/* Status */}
            <div>
              <Text weight="medium">Status</Text>

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value="open">Open</Select.Item>
                      <Select.Item value="ongoing">Ongoing</Select.Item>
                      <Select.Item value="close">Closed</Select.Item>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </div>

            {/* Start Date */}
            <div>
              <Text weight="medium">Start Date</Text>
              <TextField.Root type="date" {...register('startDate')} />
            </div>

            {/* Finished Date */}
            <div>
              <Text weight="medium">Finished Date</Text>
              <TextField.Root type="date" {...register('finishedDate')} />
              {errors.finishedDate && (
                <Text color="red">{errors.finishedDate.message}</Text>
              )}
            </div>
          </div>

          {/* Actions */}
          <Flex gap="3" mt="6" justify="end">
            <Button
              type="button"
              variant="soft"
              color="gray"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={updateCase.isPending}>
              {updateCase.isPending ? 'Saving...' : 'Save'}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DashboardUpdate;
