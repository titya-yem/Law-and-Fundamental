import home from "@/assets/home.svg";
import user from "@/assets/user.svg";
import profile from "@/assets/profile.svg";
import dashboard from "@/assets/dashboard.svg";
import backup from "@/assets/backup.svg";

interface SidebarListsProps {
  img: string;
  label: string;
  link: string;
  roles: ("admin" | "user")[];
}

export const sidebarLists: SidebarListsProps[] = [
  {
    img: home,
    label: "Home",
    link: "/",
    roles: ["admin", "user"],
  },
  {
    img: dashboard,
    label: "Dashboard",
    link: "/dashboard",
    roles: ["admin", "user"],
  },
  {
    img: user,
    label: "Users",
    link: "/dashboard/users",
    roles: ["admin"],
  },
  {
    img: profile,
    label: "Profile",
    link: "/dashboard/profile",
    roles: ["admin", "user"],
  },
  {
    img: backup,
    label: "Backup",
    link: "/dashboard/backup",
    roles: ["admin"],
  },
];