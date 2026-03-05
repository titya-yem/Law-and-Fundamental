import { Box, Container } from '@radix-ui/themes';
import lawAndJustice from '@/assets/law and justice.jpg';

const Section = () => {
  return (
    <section className="py-12 lg:py-16 bg-slate-100">
      <Container className="px-4">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <Box>
            <h2 className="text-3xl text-center md:text-left font-medium pb-12 md:pb-24">
              Main Practice Areas
            </h2>
            <p className="w-[95%]">
              Share your services or specializations. List them down as bullet
              points for easy reading, even for people on mobile. You can also
              use this space for other purposes where the information is best
              presented as concise bullet-pointed lists.
            </p>
            <ol className="py-2 list-disc list-inside">
              <li>All cases</li>
              <li>Dashboard management</li>
              <li>Everyone able to join</li>
              <li>Secure and safe</li>
            </ol>
          </Box>

          <img
            src={lawAndJustice}
            alt="Law and justice with Cambodian flag"
            className="w-87.5 md:h-80 md:w-100 mx-auto rounded-md"
          />
        </div>
      </Container>
    </section>
  );
};

export default Section;
