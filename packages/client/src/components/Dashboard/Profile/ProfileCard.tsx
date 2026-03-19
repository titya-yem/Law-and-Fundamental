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

  return (
    <Box maxWidth="400px" className="shadow-md">
      <Card>
        <DataList.Root>
          <DataList.Item>
            <DataList.Label minWidth="88px">ID</DataList.Label>
            <DataList.Value>
              <Code variant="ghost">{props.id}</Code>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Role</DataList.Label>
            <DataList.Value>
              <Badge color="jade" variant="soft" radius="full">
                {props.role}
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Name</DataList.Label>
            <DataList.Value>{props.name}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Email</DataList.Label>
            <DataList.Value>
              <a
                href={`mailto:${props.email}`}
                className="underline underline-offset-2"
              >
                {props.email}
              </a>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Created at</DataList.Label>
            <DataList.Value>
              <Code variant="ghost">{formattedDate}</Code>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Card>
    </Box>
  );
};

export default ProfileCard;
