import home from "@/assets/home.svg";
import user from "@/assets/user.svg";
import profile from "@/assets/profile.svg";

interface SidebarListsProps {
  img: string;
  label: string;
  link: string;
}

export const sidebarLists: SidebarListsProps[] = [
  { img: home, label: "Home", link: "/" },
  { img: user, label: "Users", link: "/dashboard/users" },
  { img: profile, label: "Profile", link: "/dashboard/profile" },
];