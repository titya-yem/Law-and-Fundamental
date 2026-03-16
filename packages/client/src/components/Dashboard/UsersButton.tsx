import { Button } from '@radix-ui/themes';

type UserFilter = 'all' | 'admin' | 'user';

type Props = {
  setFilter: (value: UserFilter) => void;
};

const UsersButton = ({ setFilter }: Props) => {
  return (
    <section className="flex gap-2 mb-4">
      <Button onClick={() => setFilter('all')}>All Users</Button>

      <Button onClick={() => setFilter('admin')}>Admin</Button>

      <Button onClick={() => setFilter('user')}>Users</Button>
    </section>
  );
};

export default UsersButton;
