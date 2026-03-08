import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState();

  return (
    <div className="p-4 *:text-white bg-blue-950">
      <ul>
        <li>Dashboard</li>
        <li>Settings</li>
        <li>Profile</li>
      </ul>
    </div>
  );
};

export default Sidebar;
