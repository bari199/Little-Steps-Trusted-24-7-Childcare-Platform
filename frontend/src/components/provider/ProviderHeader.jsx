import { CalendarDays, Search } from "lucide-react";
import { motion } from "framer-motion";

import useAuth from "@/hooks/useAuth";

import UserMenu from "../common/UserMenu";
import { useTheme } from "../../context/ThemeContext";

const ProviderHeader = () => {
  const { user } = useAuth();
  const { colors } = useTheme();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-40 border-b backdrop-blur-xl"
      style={{
        background: colors.nav,
        borderColor: colors.border,
      }}
    >
      <div className="flex h-20 items-center justify-between gap-6 px-6 lg:px-8">
        {/* Left */}
        <div className="flex flex-col">
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: colors.text }}
          >
            Welcome back,
            <span className="ml-2 text-orange-500">
              {user?.name?.split(" ")[0]}
            </span>
          </h1>

          <div
            className="mt-1 flex items-center gap-2 text-sm"
            style={{ color: colors.textMuted }}
          >
            <CalendarDays className="h-4 w-4" />
            {today}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: colors.textMuted }}
            />

            <input
              type="text"
              placeholder="Search..."
              className="h-11 w-72 rounded-full border pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-orange-400"
              style={{
                background: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
          </div>

          {/* User */}
          <UserMenu />
        </div>
      </div>
    </motion.header>
  );
};

export default ProviderHeader;
