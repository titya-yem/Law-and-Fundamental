import {
  type UserEditForm,
  type UsersTypes,
  userEditSchema,
} from '@/types/UserTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
  Select,
  AlertDialog,
} from '@radix-ui/themes';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
  user: UsersTypes;
};

const UserEdit = ({ user }: Props) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { control, register, handleSubmit, formState } = useForm<UserEditForm>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: UserEditForm) => {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/${user.id}`,
        data,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/${user.id}`,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpen(false);
    },
  });

  // ✅ HANDLERS
  const handleSave = (data: UserEditForm) => {
    updateMutation.mutate(data);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Edit</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description mb="4">
          Make changes to your profile.
        </Dialog.Description>

        <form
          onSubmit={handleSubmit(handleSave)}
          className="grid grid-cols-2 gap-3"
        >
          {/* Email */}
          <div className="col-span-2">
            <Text size="2" weight="bold">
              Email
            </Text>
            <TextField.Root {...register('email')} />
            {formState.errors.email && (
              <Text color="red" size="1">
                {formState.errors.email.message}
              </Text>
            )}
          </div>

          {/* Name */}
          <div>
            <Text size="2" weight="bold">
              Name
            </Text>
            <TextField.Root {...register('name')} />
            {formState.errors.name && (
              <Text color="red" size="1">
                {formState.errors.name.message}
              </Text>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col justify-center">
            <Text size="2" weight="bold">
              Role
            </Text>

            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger placeholder="Select role" />
                  <Select.Content>
                    <Select.Item value="user">User</Select.Item>
                    <Select.Item value="admin">Admin</Select.Item>
                  </Select.Content>
                </Select.Root>
              )}
            />

            {formState.errors.role && (
              <Text color="red" size="1">
                {formState.errors.role.message}
              </Text>
            )}
          </div>

          {/* Buttons */}
          <Flex className="col-span-2 mt-4" justify="between">
            {/* Delete */}
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button color="red">Delete</Button>
              </AlertDialog.Trigger>

              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete User</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Are you sure? This action cannot be undone.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>

                  <AlertDialog.Action>
                    <Button
                      color="red"
                      onClick={handleDelete}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>

            {/* Right */}
            <Flex gap="3">
              <Dialog.Close>
                <Button variant="soft">Cancel</Button>
              </Dialog.Close>

              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserEdit;
