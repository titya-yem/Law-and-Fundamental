import mainImage from '@/assets/main image.png';
import { Button, Text } from '@radix-ui/themes';
import { Link } from 'react-router';

const Home = () => {
  return (
    <main>
      <div className="relative">
        <img
          src={mainImage}
          alt="Law and Fundamental Meditation Office landing page"
        />

        <div className="absolute inset-0 flex flex-col items-start justify-center w-[80%] *:pb-6">
          <h5 className="text-lg font-medium text-white">
            Your most trusted legal firm in Phnom Penh
          </h5>

          <h1 className="text-3xl font-medium text-white">
            Providing essential legal services at rates that do you justice.
          </h1>

          <div className="pl-4">
            <Button asChild color="tomato">
              <Text as="span">
                <Link to="/dashboard">Dashboard</Link>
              </Text>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
