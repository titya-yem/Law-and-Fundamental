import { motion } from 'framer-motion';
import * as Separator from '@radix-ui/react-separator';
import { NavbarLists } from '@/constants/NavbarLists';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      className="bg-gray-50 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Separator.Root className="bg-gray-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full" />

        {/* Copyright and Links Section */}
        <motion.div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            className="text-sm text-gray-600 text-center md:text-left"
            whileHover={{ scale: 1.01 }}
          >
            © {currentYear} Law and Fundamentals Local Mediation Office
            reserved.
          </motion.p>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {NavbarLists.map((link) => (
              <motion.a
                key={link.label}
                href={link.link}
                whileHover={{ scale: 1.05, y: -1 }}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
