import mainImage from '@/assets/main image.png';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <main>
      <div className="relative overflow-hidden">
        {/* Hero Image */}
        <motion.img
          src={mainImage}
          alt="Law and Fundamental Meditation Office landing page"
          className="w-full md:h-240 object-cover object-[50%_20%]"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        <div className="absolute inset-0 flex flex-col justify-center gap-y-4 md:gap-y-6 lg:gap-y-10 xl:gap-y-14 2xl:gap-y-16 w-[80%] md:w-[60%] *:ml-6 lg:*:ml-20 2xl:*:ml-48">
          {/* Small Heading */}
          <motion.h5
            className="text-lg md:text-2xl lg:text-3xl font-medium text-white"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Your most trusted legal firm in Phnom Penh
          </motion.h5>

          {/* Main Heading */}
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-white"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Providing essential legal services at rates that do you justice.
          </motion.h1>

          {/* Button */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Button
              asChild
              color="brown"
              size={{ initial: '2', md: '3', lg: '4' }}
            >
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Home;
