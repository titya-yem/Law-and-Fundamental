type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  return (
    <>
      {/* Overlay (for mobile) */}
      {isOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-full w-64
          bg-blue-950 text-white
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="p-6 font-bold text-lg border-b border-blue-800">
          Dashboard
        </div>

        <ul className="p-4 space-y-3">
          <li className="cursor-pointer hover:text-blue-300">Dashboard</li>
          <li className="cursor-pointer hover:text-blue-300">Settings</li>
          <li className="cursor-pointer hover:text-blue-300">Profile</li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
