import { Heading } from '@radix-ui/themes';

interface FetchProps {
  isloading: boolean;
  isError: boolean;
}

const Fetch = ({ isloading, isError }: FetchProps) => {
  return (
    <>
      {isloading ? (
        <Heading as="h2" className="text-2xl">
          Loading
        </Heading>
      ) : null}

      {isError ? (
        <Heading as="h2" className="text-2xl">
          Error
        </Heading>
      ) : null}
    </>
  );
};

export default Fetch;
