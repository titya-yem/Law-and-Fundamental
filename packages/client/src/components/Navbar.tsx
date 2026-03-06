import logo from '@/assets/Logo.png';
import { NavbarPublic, NavbarPrivate } from '@/constants/NavbarLists';
import { Container, Flex } from '@radix-ui/themes';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { useLogout } from '@/hooks/useLogout';

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-semibold relative group text-gray-900'
    : 'text-gray-700 relative group hover:text-gray-900 transition-colors duration-200';

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
          <Link to="/">
            <motion.img
              src={logo}
              alt="Logo"
              className="h-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            />
          </Link>

          <nav>
            <Flex gap="4">
              {/* Home always visible */}
              <motion.div whileHover={{ scale: 1.05, y: -1 }}>
                <NavLink to="/" className={getNavClass}>
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 transition-all duration-200 group-hover:w-full" />
                </NavLink>
              </motion.div>

              {!isLoading &&
                !isLoggedIn &&
                NavbarPublic.slice(1).map(({ label, link }) => (
                  <motion.div key={link} whileHover={{ scale: 1.05, y: -1 }}>
                    <NavLink to={link} className={getNavClass}>
                      {label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full" />
                    </NavLink>
                  </motion.div>
                ))}

              {isLoggedIn &&
                NavbarPrivate.map(({ label, link }) => (
                  <motion.div key={link} whileHover={{ scale: 1.05, y: -1 }}>
                    <NavLink to={link} className={getNavClass}>
                      {label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full" />
                    </NavLink>
                  </motion.div>
                ))}

              {isLoggedIn && (
                <motion.button
                  onClick={logout}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="cursor-pointer text-gray-700 relative group hover:text-gray-900 transition-colors duration-200"
                >
                  Logout
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              )}
            </Flex>
          </nav>
        </Flex>
      </Container>
    </header>
  );
};

export default Navbar;
