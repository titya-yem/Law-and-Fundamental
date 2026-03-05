import constructionLaw from '@/assets/construction law.jpg';
import { Box, Container } from '@radix-ui/themes';
import { motion, type Variants } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const About = () => {
  return (
    <section className="pb-16 bg-gray-900">
      <Container className="px-4 lg:py-14 *:text-center *:text-white">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-left lg:pl-6 font-medium pt-12 md:pt-20 pb-8"
        >
          About Our Firm
        </motion.h2>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-y-8 md:gap-x-6"
        >
          {/* Mission */}
          <motion.div variants={cardVariants}>
            <Box>
              <img
                src={constructionLaw}
                alt="Cambodia construction law book"
                className="w-75 lg:w-80 pb-4 mx-auto rounded-md"
              />
              <h5 className="text-2xl md:text-xl font-medium">Mission</h5>
              <p className="text-base md:text-sm md:px-6">
                This page should focus on the law firm or the lawyer's
                background. As with the usual About Us pages, you can talk about
                the history, track record, or even the guiding principles of the
                firm/lawyer.
              </p>
            </Box>
          </motion.div>

          {/* Vision */}
          <motion.div variants={cardVariants}>
            <Box>
              <img
                src={constructionLaw}
                alt="Cambodia construction law book"
                className="w-75 lg:w-80 pb-4 mx-auto rounded-md"
              />
              <h5 className="text-2xl md:text-xl font-medium">Vision</h5>
              <p className="text-base md:text-sm md:px-6">
                This page should focus on the law firm or the lawyer's
                background. As with the usual About Us pages, you can talk about
                the history, track record, or even the guiding principles of the
                firm/lawyer.
              </p>
            </Box>
          </motion.div>

          {/* Value */}
          <motion.div variants={cardVariants}>
            <Box>
              <img
                src={constructionLaw}
                alt="Cambodia construction law book"
                className="w-75 lg:w-80 pb-4 mx-auto rounded-md"
              />
              <h5 className="text-2xl md:text-xl font-medium">Value</h5>
              <p className="text-base md:text-sm md:px-6">
                This page should focus on the law firm or the lawyer's
                background. As with the usual About Us pages, you can talk about
                the history, track record, or even the guiding principles of the
                firm/lawyer.
              </p>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default About;
