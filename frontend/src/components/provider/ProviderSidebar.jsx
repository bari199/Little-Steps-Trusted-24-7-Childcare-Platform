import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PlusCircle,
  Building2,
  Users,
  CalendarCheck,
  User,
} from "lucide-react";

import LogoMark from "../common/LogoMark";
import { useTheme } from "../../context/ThemeContext";

const menus = [
  {
    name: "Dashboard",
    path: "/provider/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Create Center",
    path: "/provider/create-center",
    icon: PlusCircle,
  },
  {
    name: "My Center",
    path: "/provider/center",
    icon: Building2,
  },
  {
    name: "Caregivers",
    path: "/provider/caregivers",
    icon: Users,
  },
  {
    name: "Bookings",
    path: "/provider/bookings",
    icon: CalendarCheck,
  },
  {
    name: "Profile",
    path: "/provider/profile",
    icon: User,
  },
];

const ProviderSidebar = () => {
  const { colors } = useTheme();

  return (
    <aside
      className="sticky top-0 flex h-screen w-72 flex-col border-r transition-all duration-300"
      style={{
        background: colors.surface,
        borderColor: colors.border,
      }}
    >
      {/* Logo */}

      <div
        className="flex items-center gap-3 border-b px-6 py-6"
        style={{
          borderColor: colors.border,
        }}
      >
        <LogoMark />

        <div>
          <h2
            className="text-lg font-bold"
            style={{
              color: colors.text,
            }}
          >
            Provider
          </h2>

          <p
            className="text-xs"
            style={{
              color: colors.textMuted,
            }}
          >
            Dashboard
          </p>
        </div>
      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 px-4 py-6">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink key={menu.path} to={menu.path}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{
                    x: 4,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg,#FF9500,#FFC300)"
                      : "transparent",

                    color: isActive ? "#241C0F" : colors.text,
                  }}
                >
                  <Icon
                    size={20}
                    className={`transition-transform duration-300 ${
                      isActive ? "" : "group-hover:scale-110"
                    }`}
                  />

                  <span className="font-medium">{menu.name}</span>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}

      <div
        className="border-t px-6 py-5"
        style={{
          borderColor: colors.border,
        }}
      >
        <div
          className="rounded-2xl p-4"
          style={{
            background: colors.surfaceAlt,
          }}
        >
          <p
            className="text-sm font-semibold"
            style={{
              color: colors.text,
            }}
          >
            Little Steps
          </p>

          <p
            className="mt-1 text-xs leading-relaxed"
            style={{
              color: colors.textMuted,
            }}
          >
            Trusted Childcare Provider Platform
          </p>
        </div>
      </div>
    </aside>
  );
};

export default ProviderSidebar;
