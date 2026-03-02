import logo from '@/assets/Logo.png';
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
    <header className="fixed top-10 w-full z-50">
      <Container className="px-4">
        <Flex
          justify="between"
          align="center"
          className="px-2 py-1 rounded-2xl bg-white/80"
        >
          <img
            src={logo}
            alt="Law and Fundamental Local Mediation Office Logo"
            className="h-10"
          />

          <nav>
            <Flex gap="3" className="md:gap-4 *:text-sm lg:*:text-base pr-1">
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
      </Container>
    </header>
  );
};

export default Navbar;
