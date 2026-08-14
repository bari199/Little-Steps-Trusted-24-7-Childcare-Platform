import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  CreditCard,
  User,
  LogOut,
  LucideHome,
  Menu,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NAV_ITEMS = [
  { name: "Home", path: "/", icon: LucideHome },
  { name: "Dashboard", path: "/parent/dashboard", icon: LayoutDashboard },
  { name: "My bookings", path: "/parent/my-bookings", icon: CalendarCheck },
  { name: "Browse centers", path: "/parent/centers", icon: Building2 },
  { name: "Payments", path: "/parent/payments", icon: CreditCard },
  { name: "Profile", path: "/parent/profile", icon: User },
];

const sidebarVariants = {
  expanded: { width: 288 },
  collapsed: { width: 72 },
};

const labelVariants = {
  expanded: { opacity: 1, width: "auto", marginLeft: 0 },
  collapsed: { opacity: 0, width: 0, marginLeft: 0 },
};

const LogoMark = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden
    className="shrink-0"
  >
    <defs>
      <linearGradient id="sidebarLogoGrad" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor="#FF9500" />
        <stop offset="1" stopColor="#FFDD00" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="19" fill="url(#sidebarLogoGrad)" />
    <path
      d="M14 26c0-5 3-8 6-8s6 3 6 8"
      stroke="#241C0F"
      strokeWidth="2.4"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="20" cy="14" r="3.4" fill="#241C0F" />
  </svg>
);

const ParentSidebar = ({ collapsed = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const state = collapsed ? "collapsed" : "expanded";

  return (
    <TooltipProvider delayDuration={200}>
      {/* Mobile top bar — only visible below md */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#F0E1BE] bg-white p-4 dark:border-[#3A2E17] dark:bg-[#211B10] md:hidden">
        <div className="flex items-center gap-2.5">
          <LogoMark />
          <h2
            className="text-base font-bold text-[#241C0F] dark:text-[#FFF6E2]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Little Steps
          </h2>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-[#241C0F] hover:bg-[#FFF6E2] dark:text-[#FFF6E2] dark:hover:bg-[#2A2210]"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Backdrop — mobile drawer only */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={
          typeof window !== "undefined" && window.innerWidth < 768
            ? "expanded"
            : state
        }
        transition={{ duration: 0.1, ease: [0.1, 0, 0.1, 0] }}
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col overflow-hidden border-r border-[#F0E1BE] bg-white shrink-0 transition-transform duration-300 ease-in-out dark:border-[#3A2E17] dark:bg-[#211B10] md:sticky md:top-0 md:w-auto md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar navigation"
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-2.5 border-b border-[#F0E1BE] px-4 py-5 dark:border-[#3A2E17]">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <AnimatePresence initial={false}>
              {(!collapsed || mobileOpen) && (
                <motion.div
                  key="logo-text"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <p
                    className="text-lg font-bold leading-tight text-[#241C0F] dark:text-[#FFF6E2]"
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    Little Steps
                  </p>
                  <p className="text-xs leading-tight text-[#6B5D45] dark:text-[#C9B896]">
                    Parent dashboard
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-[#6B5D45] hover:bg-[#FFF6E2] dark:text-[#C9B896] dark:hover:bg-[#2A2210] md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.map(({ name, path, icon: Icon }) => (
            <Tooltip key={path}>
              <TooltipTrigger asChild>
                <NavLink
                  to={path}
                  end={path === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-[#FF9500] to-[#FFC300] text-[#241C0F]"
                        : "text-[#6B5D45] hover:bg-[#FFF6E2] dark:text-[#C9B896] dark:hover:bg-[#2A2210]"
                    }`
                  }
                >
                  <Icon
                    size={18}
                    className="relative z-10 shrink-0"
                    aria-hidden="true"
                  />
                  <motion.span
                    variants={labelVariants}
                    animate={mobileOpen ? "expanded" : state}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 min-w-0 flex-1 overflow-hidden truncate whitespace-nowrap"
                  >
                    {name}
                  </motion.span>
                </NavLink>
              </TooltipTrigger>
              {collapsed && !mobileOpen && (
                <TooltipContent side="right" className="text-xs">
                  {name}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#F0E1BE] p-4 dark:border-[#3A2E17]">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-950/30">
                <LogOut size={16} className="shrink-0" aria-hidden="true" />
                <motion.span
                  variants={labelVariants}
                  animate={mobileOpen ? "expanded" : state}
                  transition={{ duration: 0.2 }}
                  className="min-w-0 overflow-hidden truncate whitespace-nowrap"
                >
                  Logout
                </motion.span>
              </button>
            </TooltipTrigger>
            {collapsed && !mobileOpen && (
              <TooltipContent side="right" className="text-xs">
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
};

export default ParentSidebar;
