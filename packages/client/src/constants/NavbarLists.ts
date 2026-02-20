export interface NavbarProps {
  label: string;
  link: string;
}

export const NavbarPublic: NavbarProps[] = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: "/dashboard" }
];

export const NavbarGuest: NavbarProps[] = [
  { label: "Login", link: "/login" },
  { label: "Register", link: "/register" }
];

export const NavbarPrivate: NavbarProps[] = [];