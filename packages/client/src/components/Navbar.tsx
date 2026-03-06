import logo from '@/assets/Logo.png';
import { NavbarPublic, NavbarPrivate } from '@/constants/NavbarLists';
import { Container, Flex } from '@radix-ui/themes';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { useLogout } from '@/hooks/useLogout';

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'font-semibold underline' : 'text-gray-700 hover:underline';

const Navbar = () => {
  const { data: user, isLoading } = useAuth();
  const logout = useLogout();

  const isLoggedIn = !!user;

  return (
    <header className="fixed top-5 w-full z-50">
      <Container className="px-4">
        <Flex
          justify="between"
          align="center"
          className="px-3 py-2 rounded-2xl bg-white/80 backdrop-blur-md shadow-sm"
        >
          <motion.img
            src={logo}
            alt="Logo"
            className="h-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          />

          <nav>
            <Flex gap="4">
              {/* Home always visible */}
              <NavLink to="/" className={getNavClass}>
                Home
              </NavLink>

              {!isLoading && !isLoggedIn && (
                <>
                  {NavbarPublic.slice(1).map(({ label, link }) => (
                    <NavLink key={link} to={link} className={getNavClass}>
                      {label}
                    </NavLink>
                  ))}
                </>
              )}

              {isLoggedIn && (
                <>
                  {NavbarPrivate.map(({ label, link }) => (
                    <NavLink key={link} to={link} className={getNavClass}>
                      {label}
                    </NavLink>
                  ))}

                  <button
                    onClick={logout}
                    className="cursor-pointer text-gray-700 hover:underline"
                  >
                    Logout
                  </button>
                </>
              )}
            </Flex>
          </nav>
        </Flex>
      </Container>
    </header>
  );
};

export default Navbar;
