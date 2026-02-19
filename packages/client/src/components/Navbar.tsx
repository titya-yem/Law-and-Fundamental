import logo from '@/assets/Logo.jpg';
import { NavbarAuth, NavbarLists } from '@/constants/NavbarLists';
import { NavLink } from 'react-router';

// Check if link is active show semi-bold font
const getNavClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'font-semibold' : 'text-gray-700';

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <img
        src={logo}
        alt="Law and Fdamental Local Mediation Office Logo"
        className="w-13.75"
      />

      <nav className="flex gap-x-3">
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
      </nav>
    </header>
  );
};

export default Navbar;
