import { useState } from 'react';
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
  Select,
} from '@radix-ui/themes';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import {
  caseFormSchema,
  type CaseFormValues,
  type CaseProps,
} from '@/types/CaseForm';

const formatDate = (date: string) => new Date(date).toISOString().split('T')[0]; // YYYY-MM-DD

const DashboardUpdate = ({ caseItem }: CaseProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

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
      startDate: formatDate(caseItem.startDate),
      finishedDate: caseItem.finishedDate
        ? formatDate(caseItem.finishedDate)
        : null,
    },
  });

  const status = useWatch({
    control,
    name: 'status',
  });

  const mutation = useMutation({
    mutationFn: async (data: CaseFormValues) => {
      const payload = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        finishedDate: data.finishedDate
          ? new Date(data.finishedDate).toISOString()
          : null,
      };

      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/case/update/${caseItem.id}`,
        payload,
        { withCredentials: true }
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      setOpen(false);
    },
  });

  const onSubmit = (data: CaseFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button size="1">Edit</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="700px">
        <Dialog.Title>Edit Case</Dialog.Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            {/* Case Number */}
            <div>
              <Text>Case Number</Text>
              <TextField.Root {...register('caseNumber')} />
              {errors.caseNumber && (
                <Text color="red">{errors.caseNumber.message}</Text>
              )}
            </div>

            {/* Title */}
            <div>
              <Text>Title</Text>
              <TextField.Root {...register('title')} />
              {errors.title && <Text color="red">{errors.title.message}</Text>}
            </div>

            {/* Content - 2 cols & 2 rows */}
            <div className="col-span-2">
              <Text>Content</Text>
              <textarea
                {...register('content')}
                className="w-full h-40 border rounded-md p-2 resize-none"
              />
              {errors.content && (
                <Text color="red">{errors.content.message}</Text>
              )}
            </div>

            {/* Status */}
            <div>
              <Text>Status</Text>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value="open">Open</Select.Item>
                      <Select.Item value="ongoing">Ongoing</Select.Item>
                      <Select.Item value="close">Close</Select.Item>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </div>

            {/* Start Date */}
            <div>
              <Text>Start Date</Text>
              <TextField.Root type="date" {...register('startDate')} />
            </div>

            {/* Finished Date */}
            {status === 'close' && (
              <div>
                <Text>Finished Date</Text>
                <TextField.Root type="date" {...register('finishedDate')} />
                {errors.finishedDate && (
                  <Text color="red">{errors.finishedDate.message}</Text>
                )}
              </div>
            )}
          </div>

          <Flex gap="3" mt="5" justify="end">
            <Button
              type="button"
              variant="soft"
              color="gray"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving...' : 'Save'}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DashboardUpdate;
