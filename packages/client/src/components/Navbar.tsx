import logo from '@/assets/Logo.jpg';
import { NavbarAuth, NavbarLists } from '@/constants/NavbarLists';
import { Container, Flex } from '@radix-ui/themes';
import { NavLink } from 'react-router';

// Check if link is active show semi-bold font
const getNavClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'font-semibold' : 'text-gray-700 hover:underline delay-200';

const Navbar = () => {
  return (
    <Container>
      <header>
        <Flex justify="between" align="center" py="2">
          <img
            src={logo}
            alt="Law and Fdamental Local Mediation Office Logo"
            className="w-13.75 lg:w-16.25"
          />

          <nav>
            <Flex gapX="4" className="*:text-sm lg:*:text-base">
              {NavbarLists.map(({ label, link }) => (
                <NavLink key={link} to={link} className={getNavClass}>
                  {label}
                </NavLink>
              ))}

              {/* for Auth */}
              {NavbarAuth.map(({ label, link }) => (
                <NavLink key={link} to={link} className={getNavClass}>
                  {label}
                </NavLink>
              ))}
            </Flex>
          </nav>
        </Flex>
      </header>
    </Container>
  );
};

export default Navbar;
