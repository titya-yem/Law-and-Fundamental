import { Badge, Box, Card, Code, DataList } from '@radix-ui/themes';

export interface ProfileCardProps {
  id: number;
  email: string;
  role: 'user' | 'admin';
  name: string;
  create_at: string;
}

const ProfileCard = (props: ProfileCardProps) => {
  const formattedDate = new Date(props.create_at).toLocaleDateString('en-US');

  const getRoleColor = (role: string) => {
    if (role === 'admin') return 'crimson';
    else return 'blue';
  };

  return (
    <Box maxWidth="400px" className="shadow-md">
      <Card>
        <DataList.Root>
          <DataList.Item>
            <DataList.Label minWidth="88px">ID</DataList.Label>
            <DataList.Value>
              <Code variant="ghost" className="font-medium">
                {props.id}
              </Code>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Role</DataList.Label>
            <DataList.Value>
              <Badge color={getRoleColor(props.role)} size="2">
                {props.role}
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Name</DataList.Label>
            <DataList.Value className="font-medium">
              {props.name}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Email</DataList.Label>
            <DataList.Value>
              <a
                href={`mailto:${props.email}`}
                className="font-medium underline underline-offset-2 text-blue-400"
              >
                {props.email}
              </a>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Created at</DataList.Label>
            <DataList.Value>
              <Code>{formattedDate}</Code>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Card>
    </Box>
  );
};

export default ProfileCard;
