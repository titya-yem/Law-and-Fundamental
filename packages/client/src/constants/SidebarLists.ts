import home from "@/assets/home.svg";
import user from "@/assets/user.svg";
import profile from "@/assets/profile.svg";
import dashboard from "@/assets/dashboard.svg";
import backup from "@/assets/backup.svg";

interface SidebarListsProps {
  img: string;
  label: string;
  link: string;
}

export const sidebarLists: SidebarListsProps[] = [
  { img: home, label: "Home", link: "/" },
  { img: dashboard, label: "Dashboard", link: "/dashboard" },
  { img: user, label: "Users", link: "/dashboard/users" },
  { img: profile, label: "Profile", link: "/dashboard/profile" },
  { img: backup, label: "Backup", link: "/dashboard/backup" },
];