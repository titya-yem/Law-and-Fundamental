import { Box, Container, Text } from '@radix-ui/themes';
import commentSVG from '@/assets/comment.svg';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Testimonials = () => {
  const testimonials = [
    {
      text: "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations, so feedback from others who've tried it is invaluable.",
      author: '- Estelle Darcy',
    },
    {
      text: "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations, so feedback from others who've tried it is invaluable.",
      author: '- Estelle Darcy',
    },
    {
      text: "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations, so feedback from others who've tried it is invaluable.",
      author: '- Estelle Darcy',
    },
  ];

  return (
    <section className="bg-yellow-500">
      <Container className="px-2 md:px-4 py-8 lg:py-24">
        <div className="flex flex-col md:flex-row justify-between md:items-start md:gap-x-28">
          {/* Titles */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-none *:font-medium *:py-1 pb-2 md:pb-0 text-center"
          >
            <h2 className="text-3xl text-white">Collaborator Testimonials</h2>
            <h5 className="text-xl md:text-2xl text-yellow-700">
              We are honored to serve you
            </h5>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col justify-between items-center gap-y-4 max-w-120"
          >
            {testimonials.map((t, id) => (
              <motion.div
                key={id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col gap-x-2 md:flex-row *:text-white p-4 md:p-2 rounded-md"
              >
                <img
                  src={commentSVG}
                  alt="comment SVG"
                  className="h-8 md:h-6 mb-2 md:mb-0 mx-auto md:mx-0"
                />
                <Box>
                  <Text as="p" className="pb-4">
                    {t.text}
                  </Text>
                  <Text as="p" className="text-sm font-medium">
                    {t.author}
                  </Text>
                </Box>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
