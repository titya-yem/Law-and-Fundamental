import {
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from '@radix-ui/themes';
import FeatureCard from '@/components/FeatureCard';
import constructionLaw from '@/assets/construction law.jpg';
import lawAndJustice from '@/assets/law and justice.jpg';
import { Link } from 'react-router';

export default function CaseManagementLanding() {
  return (
    <Flex direction="column">
      {/* Hero Section */}
      <Section size="3" className="bg-slate-200">
        <Container size="3">
          <Flex
            direction="column"
            align="center"
            justify="center"
            gap="4"
            className="text-center py-10"
          >
            <Text
              size="1"
              className="uppercase font-medium tracking-widest text-gray-600"
            >
              Manage
            </Text>

            <Heading size="8" weight="medium">
              Organize your cases
            </Heading>

            <Text size="3" className="max-w-2xl text-gray-700">
              A clean, professional system built for legal teams who need to
              track cases without the noise. Filter by status, search by case
              number, and access everything in one place. Simple enough for
              users, powerful enough for admins.
            </Text>

            <Flex gap="3" mt="4">
              <Button size="3">
                <Link to="/login">Login</Link>
              </Button>
              <Button size="3" variant="outline">
                <Link to="/register">Register</Link>
              </Button>
            </Flex>

            {/* left side */}
            <img src="" alt="" />
          </Flex>
        </Container>
      </Section>

      {/* Advantages Section */}
      <Section size="3">
        <Container size="4">
          <Flex
            direction="column"
            align="center"
            gap="3"
            className="text-center"
          >
            <Text size="1" className="uppercase tracking-widest text-gray-500">
              Advantages
            </Text>

            <Heading size="7" weight="medium">
              Built for legal teams
            </Heading>

            <Text size="3" className="text-gray-600">
              Work faster, collaborate better, stay organized
            </Text>
          </Flex>

          <Flex gap="5" mt="7" wrap="wrap" justify="center">
            <FeatureCard
              title="Efficiency that saves hours each week"
              description="Eliminate manual tracking and redundant work"
              imageUrl={constructionLaw}
              link="dashboard"
              goTo="Dashboard"
            />

            <FeatureCard
              title="Documents stay protected and accessible"
              description="Role-based access keeps sensitive files secure"
              imageUrl={lawAndJustice}
              link="cases"
              goTo="Cases"
            />
          </Flex>
        </Container>
      </Section>
    </Flex>
  );
}
