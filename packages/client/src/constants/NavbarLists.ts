
interface NavbarProps {
    label: string,
    link: string
}

export const NavbarLists: NavbarProps[] = [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: "/dashboard" },
    { label: "Register", link: "/register" }
];

export const NavbarAuth: NavbarProps[] = [
    { label: "Login", link: "/login" },
    // { label: "Logout", link: "/logout" }
];