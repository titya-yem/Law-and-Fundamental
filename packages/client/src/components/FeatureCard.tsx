import { motion } from 'framer-motion';
import { Card, Flex, Button, Text, Heading } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  goTo: string;
}

const FeatureCard = ({
  title,
  description,
  imageUrl,
  link,
  goTo,
}: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="w-full max-w-90"
    >
      <Card
        size="3"
        className="relative overflow-hidden rounded-2xl shadow-xl group"
      >
        {/* Background Image */}
        <motion.img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

        {/* Content */}
        <Flex
          direction="column"
          justify="between"
          className="relative z-10 h-64 p-6 text-white"
        >
          <Flex direction="column" gap="3">
            <Flex
              align="center"
              justify="center"
              className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm"
            >
              <Text weight="bold">□</Text>
            </Flex>

            <Heading size="5" className="leading-snug">
              {title}
            </Heading>

            <Text size="2" className="text-white/90">
              {description}
            </Text>
          </Flex>

          <Button
            asChild
            size="2"
            className="self-start !text-white !bg-white/20 hover:!bg-white/30 backdrop-blur-sm"
          >
            <Link to={`/${link}`} className="no-underline">
              {goTo}
            </Link>
          </Button>
        </Flex>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
