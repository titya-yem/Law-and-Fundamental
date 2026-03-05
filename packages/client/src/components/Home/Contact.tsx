import { Box, Container, Flex, Text } from '@radix-ui/themes';
import logo from '@/assets/Logo.jpg';
import facebook from '@/assets/facebook.svg';
import telegram from '@/assets/telegram.svg';

const Contact = () => {
  return (
    <section className="py-6 lg:py-16 *:text-white bg-gray-800">
      <Container className="px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <img
            src={logo}
            alt="Law and Funamental Local Mediation Office logo"
            className="md:w-80 rounded-md"
          />

          <div className="md:pr-20">
            <h1 className="text-3xl md:text-4xl font-medium py-6">
              Get In Touch
            </h1>

            <div className="*:pb-4">
              <Box>
                <h5 className="text-xl pb-1 text-amber-500">Phone</h5>
                <Text as="p">(123) 456-789</Text>
              </Box>

              <Box>
                <h5 className="text-xl pb-1 text-amber-500">Email</h5>
                <a
                  href="mailto:hello@reallygreatesite.com"
                  className="underline underline-offset-2"
                >
                  hello@reallygreatesite.com
                </a>
              </Box>

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

                  <a href="www.telegram.com">
                    <img
                      src={telegram}
                      alt="telegram logo link"
                      className="invert"
                    />
                  </a>
                </Flex>
              </Box>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
