import { Box, Heading, Text } from '@radix-ui/themes';

const LeftDashboard = () => {
  return (
    <Box className="w-75 bg-gray-50 rounded-md p-4">
      <Heading size="4" className="mb-4">
        CRUD Panel
      </Heading>
      <Text className="text-gray-500">CRUD operations will appear here.</Text>
    </Box>
  );
};

export default LeftDashboard;
