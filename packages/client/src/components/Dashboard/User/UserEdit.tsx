import { z } from 'zod';
import { type UsersTypes, userEditSchema } from '@/types/UserTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  Select,
  SelectItem,
} from '@radix-ui/react-select';
import { useForm, Controller } from 'react-hook-form';

type UserEditForm = z.infer<typeof userEditSchema>;

type Props = {
  user: UsersTypes;
  onSave?: (data: UsersTypes) => void;
};

const UserEdit = ({ user: initialUser, onSave }: Props) => {
  const form = useForm<UserEditForm>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: initialUser.name,
      email: initialUser.email,
      role: initialUser.role,
    },
  });

  const handleSave = (data: UserEditForm) => {
    if (onSave) onSave({ ...initialUser, ...data });
    console.log('Saved user:', { ...initialUser, ...data });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Edit</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>

        <form
          onSubmit={form.handleSubmit(handleSave)}
          className="grid grid-cols-2 gap-3"
        >
          {/* Email spans full row */}
          <div className="col-span-2">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root
                {...form.register('email')}
                placeholder="Enter your email"
              />
              {form.formState.errors.email && (
                <Text color="red" size="1">
                  {form.formState.errors.email.message}
                </Text>
              )}
            </label>
          </div>

          {/* Name field */}
          <div>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
                {...form.register('name')}
                placeholder="Enter your full name"
              />
              {form.formState.errors.name && (
                <Text color="red" size="1">
                  {form.formState.errors.name.message}
                </Text>
              )}
            </label>
          </div>

          {/* Role field */}
          <div>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Role
              </Text>
              <div className="border border-gray-300 rounded px-2 py-1">
                <Controller
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {form.formState.errors.role && (
                <Text color="red" size="1">
                  {form.formState.errors.role.message}
                </Text>
              )}
            </label>
          </div>

          {/* Buttons: span both columns */}
          <Flex gap="3" mt="4" justify="end" className="col-span-2">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit">Save</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserEdit;
