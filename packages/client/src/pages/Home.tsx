import { Button, Container, Flex, Heading, Text } from '@radix-ui/themes';
import { Link } from 'react-router';

const Home = () => {
  return (
    <Container>
      <main className="flex flex-col justify-center items-center gap-y-2 px-4 lg:px-0">
        <Text className="font-medium">Manage</Text>
        <Heading as="h1" className="font-semibold">
          Organize your cases
        </Heading>

        <Text className="text-sm text-center text-gray-600">
          A clean, professional system built for legal teams who need to track
          cases without the noise. Filter by status, search by case number, and
          access everything in one place. Simple enough for users, powerful
          enough for admins.
        </Text>

        <Flex
          justify="center"
          align="center"
          gapX="2"
          className="*:cursor-pointer"
        >
          <Button color="cyan" variant="soft">
            <Link to="/login">Login</Link>
          </Button>
          <Button color="crimson" variant="soft">
            <Link to="/register">Register</Link>
          </Button>
        </Flex>
      </main>
    </Container>
  );
};

export default Home;
