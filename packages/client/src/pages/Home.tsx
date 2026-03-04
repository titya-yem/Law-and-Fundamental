import mainImage from '@/assets/main image.png';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router';

const Home = () => {
  return (
    <main>
      <div className="relative">
        <img
          src={mainImage}
          alt="Law and Fundamental Meditation Office landing page"
          className="w-full md:h-240 object-cover object-[50%_20%]"
        />

        <div className="absolute inset-0 flex flex-col justify-center gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-y-14 2xl:gap-y-16 w-[80%] md:w-[60%] *:ml-6 lg:*:ml-20 2xl:*:ml-48">
          <h5 className="text-lg md:text-2xl lg:text-3xl font-medium text-white">
            Your most trusted legal firm in Phnom Penh
          </h5>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white">
            Providing essential legal services at rates that do you justice.
          </h1>

          <div>
            <Button
              asChild
              color="brown"
              size={{ initial: '2', md: '3', lg: '4' }}
            >
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
