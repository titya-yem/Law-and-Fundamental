import constructionLaw from '@/assets/construction law.jpg';
import { Box, Container } from '@radix-ui/themes';

const About = () => {
  return (
    <section className="pb-16 bg-gray-900">
      <Container className="px-4 *:text-center *:text-white">
        <h2 className="text-3xl md:text-left lg:pl-6 font-medium pt-12 md:pt-20 pb-8">
          About Our Firm
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center gap-y-8 md:gap-x-6">
          <Box>
            <img
              src={constructionLaw}
              alt="Cambodia construction law book"
              className="w-75 lg:w-80 pb-4 mx-auto rounded-md"
            />
            <h5 className="text-2xl md:text-xl font-medium">Mission</h5>
            <p className="text-base md:text-sm">
              This page should focus on the law firm or the lawyer's background.
              As with the usual About Us pages, you can talk about the history,
              track record, or even the guiding principles of the firm/lawyer.
            </p>
          </Box>

          <Box>
            <img
              src={constructionLaw}
              alt="Cambodia construction law book"
              className="w-75 lg:w-80 pb-4 mx-auto rounded-md"
            />
            <h5 className="text-2xl md:text-xl font-medium">Vision</h5>
            <p className="text-base md:text-sm">
              This page should focus on the law firm or the lawyer's background.
              As with the usual About Us pages, you can talk about the history,
              track record, or even the guiding principles of the firm/lawyer.
            </p>
          </Box>

          <Box>
            <img
              src={constructionLaw}
              alt="Cambodia construction law book"
              className="w-75 lg:w-80 pb-4 mx-auto rounded-md"
            />
            <h5 className="text-2xl md:text-xl font-medium">Value</h5>
            <p className="text-base md:text-sm">
              This page should focus on the law firm or the lawyer's background.
              As with the usual About Us pages, you can talk about the history,
              track record, or even the guiding principles of the firm/lawyer.
            </p>
          </Box>
        </div>
      </Container>
    </section>
  );
};

export default About;
