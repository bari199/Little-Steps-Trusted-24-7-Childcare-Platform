import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Dashboard",
    path: "/provider/dashboard",
  },
  {
    name: "Create Center",
    path: "/provider/create-center",
  },
  {
    name: "My Center",
    path: "/provider/center",
  },
  {
    name: "Caregivers",
    path: "/provider/caregivers",
  },
  {
    name: "Bookings",
    path: "/provider/bookings",
  },
  {
    name: "Profile",
    path: "/provider/profile",
  },
];

const ProviderSidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="border-b p-6 text-2xl font-bold">Provider</div>

      <nav className="space-y-2 p-4">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 ${
                isActive ? "bg-green-600 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default ProviderSidebar;
