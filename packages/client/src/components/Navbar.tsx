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
import { motion, AnimatePresence } from 'framer-motion';

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'font-semibold underline' : 'text-gray-700 hover:underline';

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const Navbar = () => {
  const { data: user, isLoading } = useAuth();
  const logout = useLogout();

  const isLoggedIn = !isLoading && !!user;

  return (
    <header className="fixed top-5 w-full z-50">
      <Container className="px-4">
        <Flex
          justify="between"
          align="center"
          className="px-3 py-2 rounded-2xl bg-white/80 backdrop-blur-md shadow-sm"
        >
          {/* Logo */}
          <motion.img
            src={logo}
            alt="Law and Fundamental Local Mediation Office Logo"
            className="h-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          />

          <nav>
            <Flex gap="3" className="md:gap-4 *:text-sm lg:*:text-base pr-1">
              {/* Public links */}
              {NavbarPublic.map(({ label, link }) => (
                <motion.div
                  key={link}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  whileHover={{ scale: 1.05 }}
                >
                  <NavLink to={link} className={getNavClass}>
                    {label}
                  </NavLink>
                </motion.div>
              ))}

              <AnimatePresence mode="wait">
                {/* Logged in */}
                {isLoggedIn && (
                  <>
                    {NavbarPrivate.map(({ label, link }) => (
                      <motion.div
                        key={link}
                        variants={itemVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        whileHover={{ scale: 1.05 }}
                      >
                        <NavLink to={link} className={getNavClass}>
                          {label}
                        </NavLink>
                      </motion.div>
                    ))}

                    <motion.button
                      key="logout"
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      whileHover={{ scale: 1.05 }}
                      onClick={logout}
                      className="text-gray-700 hover:underline"
                    >
                      Logout
                    </motion.button>
                  </>
                )}

                {/* Guest */}
                {!isLoggedIn &&
                  !isLoading &&
                  NavbarGuest.map(({ label, link }) => (
                    <motion.div
                      key={link}
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      whileHover={{ scale: 1.05 }}
                    >
                      <NavLink to={link} className={getNavClass}>
                        {label}
                      </NavLink>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </Flex>
          </nav>
        </Flex>
      </Container>
    </header>
  );
};

export default Navbar;
