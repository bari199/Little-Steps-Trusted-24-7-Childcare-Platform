import { Bell } from "lucide-react";

import UserMenu from "../../common/UserMenu";
import { useTheme } from "../../../context/ThemeContext";

const AdminNavbar = () => {
  const { colors } = useTheme();

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300"
      style={{
        backgroundColor: colors.nav,
        borderColor: colors.border,
      }}
    >
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="min-w-0">
          <h1
            className="text-xl font-bold tracking-tight sm:text-2xl"
            style={{
              color: colors.text,
              fontFamily: "Fraunces, serif",
            }}
          >
            Admin Dashboard
          </h1>

          <p
            className="mt-0.5 hidden text-sm sm:block"
            style={{
              color: colors.textMuted,
            }}
          >
            Manage your childcare platform
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
              boxShadow: `0 4px 12px rgba(36, 28, 15, 0.06)`,
            }}
          >
            <Bell className="h-5 w-5" />

            {/* Notification Dot */}
            <span
              className="absolute right-2 top-2 h-2 w-2 rounded-full"
              style={{
                backgroundColor: "#FF9500",
              }}
            />
          </button>

          {/* Divider */}
          <div
            className="hidden h-9 w-px sm:block"
            style={{
              backgroundColor: colors.border,
            }}
          />

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
