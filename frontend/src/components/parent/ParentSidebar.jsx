import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  CreditCard,
  Heart,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    path: "/parent/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Bookings",
    path: "/parent/bookings",
    icon: CalendarCheck,
  },
  {
    name: "Browse Centers",
    path: "/centers",
    icon: Building2,
  },
  {
    name: "Payments",
    path: "/parent/payments",
    icon: CreditCard,
  },
  {
    name: "Favorites",
    path: "/parent/favorites",
    icon: Heart,
  },
  {
    name: "Profile",
    path: "/parent/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/parent/settings",
    icon: Settings,
  },
];

const ParentSidebar = () => {
  return (
    <aside className="w-72 bg-base-100 border-r shadow-sm">
      {/* Logo */}
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold text-primary">Little Steps</h2>

        <p className="text-sm text-base-content/60">Parent Dashboard</p>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-200"
                }`
              }
            >
              <Icon size={20} />

              <span>{menu.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-72 border-t p-4">
        <button className="btn btn-error btn-outline w-full">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default ParentSidebar;
