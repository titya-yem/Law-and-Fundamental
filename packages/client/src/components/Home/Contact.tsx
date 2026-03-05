import { Box, Container, Flex, Text } from '@radix-ui/themes';
import logo from '@/assets/Logo.jpg';
import facebook from '@/assets/facebook.svg';
import telegram from '@/assets/telegram.svg';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Contact = () => {
  return (
    <section className="py-6 lg:py-16 *:text-white bg-gray-800">
      <Container className="px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <motion.img
            src={logo}
            alt="Law and Fundamental Local Mediation Office logo"
            className="md:w-80 rounded-md"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          />

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="md:pr-20 w-full md:w-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl font-medium py-6"
            >
              Get In Touch
            </motion.h1>

            <motion.div variants={containerVariants} className="*:pb-4">
              {/* Phone */}
              <motion.div variants={itemVariants}>
                <Box>
                  <h5 className="text-xl pb-1 text-amber-500">Phone</h5>
                  <Text as="p">(123) 456-789</Text>
                </Box>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <Box>
                  <h5 className="text-xl pb-1 text-amber-500">Email</h5>
                  <a
                    href="mailto:hello@reallygreatesite.com"
                    className="underline underline-offset-2"
                  >
                    hello@reallygreatesite.com
                  </a>
                </Box>
              </motion.div>

              {/* Social */}
              <motion.div variants={itemVariants}>
                <Box>
                  <h5 className="text-xl pb-1 text-amber-500">Social</h5>
                  <Flex align="center" gapX="2">
                    <a href="https://www.facebook.com/titya.yem.98/">
                      <img
                        src={facebook}
                        alt="facebook logo link"
                        className="invert"
                      />
                    </a>

                    <a href="https://www.telegram.org">
                      <img
                        src={telegram}
                        alt="telegram logo link"
                        className="invert"
                      />
                    </a>
                  </Flex>
                </Box>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
