import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  BarChart3,
  Baby,
} from "lucide-react";

import { useTheme } from "../../../context/ThemeContext";

const menus = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    name: "Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    name: "Providers",
    icon: Building2,
    path: "/admin/providers",
  },
  {
    name: "Centers",
    icon: Building2,
    path: "/admin/centers",
  },
  {
    name: "Bookings",
    icon: CalendarCheck,
    path: "/admin/bookings",
  },
  {
    name: "Subscriptions",
    icon: GraduationCap,
    path: "/admin/subscriptions",
  },
  {
    name: "Payments",
    icon: CreditCard,
    path: "/admin/payments",
  },
  {
    name: "Reports",
    icon: BarChart3,
    path: "/admin/reports",
  },
];

const AdminSidebar = () => {
  const { colors } = useTheme();

  return (
    <aside
      className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      {/* Logo / Brand */}
      <div
        className="border-b px-6 py-6"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-sm"
            style={{
              background: "linear-gradient(135deg, #FF9500 0%, #FFC300 100%)",
              color: "#241C0F",
            }}
          >
            <Baby className="h-6 w-6" strokeWidth={2.5} />
          </div>

          {/* Brand */}
          <div className="min-w-0">
            <h2
              className="truncate text-xl font-bold tracking-tight"
              style={{
                color: colors.text,
                fontFamily: "Fraunces, serif",
              }}
            >
              Little Steps
            </h2>

            <p
              className="mt-0.5 text-xs font-medium"
              style={{ color: colors.textMuted }}
            >
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-5">
        <p
          className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ color: colors.textMuted }}
        >
          Management
        </p>

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className="group relative block"
            >
              {({ isActive }) => (
                <div
                  className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? "#FFF6E2" : "transparent",
                    color: isActive ? colors.text : colors.textMuted,
                    border: isActive
                      ? `1px solid ${colors.border}`
                      : "1px solid transparent",
                    boxShadow: isActive
                      ? "0 3px 12px rgba(255,149,0,0.08)"
                      : "none",
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span
                      className="absolute left-0 h-7 w-1 rounded-r-full"
                      style={{
                        background: "linear-gradient(180deg, #FF9500, #FFC300)",
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? "#FF95001F" : "transparent",
                      color: isActive ? "#FF9500" : colors.textMuted,
                    }}
                  >
                    <Icon
                      className="h-[18px] w-[18px]"
                      strokeWidth={isActive ? 2.3 : 2}
                    />
                  </div>

                  {/* Label */}
                  <span className="flex-1">{menu.name}</span>

                  {/* Active dot */}
                  {isActive && (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "#FF9500" }}
                    />
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Brand Card */}
      <div className="p-3">
        <div
          className="overflow-hidden rounded-2xl border p-4"
          style={{
            background: "linear-gradient(135deg, #FFF6E2 0%, #FFFAE8 100%)",
            borderColor: colors.border,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "#FF9500" }}
            />

            <span
              className="text-xs font-semibold"
              style={{ color: colors.text }}
            >
              Little Steps
            </span>
          </div>

          <p
            className="mt-2 text-[11px] leading-4"
            style={{ color: colors.textMuted }}
          >
            Trusted childcare management platform.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
