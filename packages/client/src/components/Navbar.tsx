import logo from '@/assets/Logo.jpg';
import {
  NavbarPublic,
  NavbarGuest,
  NavbarPrivate,
} from '@/constants/NavbarLists';
import { Container, Flex } from '@radix-ui/themes';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-semibold underline'
    : 'text-gray-700 hover:underline delay-200';

const Navbar = () => {
  const { data: user, isLoading } = useAuth();

  const isLoggedIn = !isLoading && !!user;

  return (
    <Container className="px-4">
      <header>
        <Flex justify="between" align="center" py="2">
          <img src={logo} alt="Logo" className="w-14 lg:w-16" />

          <nav>
            <Flex gap="4" className="*:text-sm lg:*:text-base">
              {/* Always visible links */}
              {NavbarPublic.map(({ label, link }) => (
                <NavLink key={link} to={link} className={getNavClass}>
                  {label}
                </NavLink>
              ))}

              {/* Private links for logged-in users */}
              {isLoggedIn &&
                NavbarPrivate.map(({ label, link }) => (
                  <NavLink key={link} to={link} className={getNavClass}>
                    {label}
                  </NavLink>
                ))}

              {/* Logout button for logged-in users */}
              {isLoggedIn && (
                <button
                  onClick={useLogout}
                  className="text-gray-700 hover:underline"
                >
                  Logout
                </button>
              )}

              {/* Guest links if not logged-in */}
              {!isLoading &&
                !isLoggedIn &&
                NavbarGuest.map(({ label, link }) => (
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
