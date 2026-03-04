import { Box, Container, Text } from '@radix-ui/themes';
import commentSVG from '@/assets/comment.svg';

const Testimonials = () => {
  return (
    <section className="bg-yellow-500">
      <Container className="px-2 md:px-4 py-8">
        <Box className="*:font-medium *:py-1 pb-2 text-center">
          <h2 className="text-3xl text-white">Colaborator Testimonials</h2>
          <h5 className="text-xl text-yellow-700">
            We are honored to served you
          </h5>
        </Box>

        <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-x-6 md:*:text-center">
          <Box className="*:text-white">
            <img
              src={commentSVG}
              alt="comment SVG"
              className="h-8 mb-2 mx-auto"
            />
            <Text as="p" className="pb-4">
              Boost your product and service's credibility by adding
              testimonials from your clients. People love recommendations, so
              feedback from others who've tried it is invaluable.
            </Text>
            <Text as="p">- Estelle Darcy</Text>
          </Box>

          <Box className="*:text-white">
            <img
              src={commentSVG}
              alt="comment SVG"
              className="h-8 mb-2 mx-auto"
            />
            <Text as="p" className="pb-4">
              Boost your product and service's credibility by adding
              testimonials from your clients. People love recommendations, so
              feedback from others who've tried it is invaluable.
            </Text>
            <Text as="p">- Estelle Darcy</Text>
          </Box>

          <Box className="*:text-white">
            <img
              src={commentSVG}
              alt="comment SVG"
              className="h-8 mb-2 mx-auto"
            />
            <Text as="p" className="pb-4">
              Boost your product and service's credibility by adding
              testimonials from your clients. People love recommendations, so
              feedback from others who've tried it is invaluable.
            </Text>
            <Text as="p">- Estelle Darcy</Text>
          </Box>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
