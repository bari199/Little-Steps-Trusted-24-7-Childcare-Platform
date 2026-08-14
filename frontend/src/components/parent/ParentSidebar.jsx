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
  {
    name: "Home",
    path: "/",
    icon: LucideHome,
  },
  {
    name: "Dashboard",
    path: "/parent/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My bookings",
    path: "/parent/my-bookings",
    icon: CalendarCheck,
  },
  {
    name: "Browse centers",
    path: "/parent/centers",
    icon: Building2,
  },
  {
    name: "Payments",
    path: "/parent/payments",
    icon: CreditCard,
  },
  {
    name: "Profile",
    path: "/parent/profile",
    icon: User,
  },
];

const LogoMark = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
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

  return (
    <TooltipProvider delayDuration={200}>
      {/* =========================================================
          MOBILE TOP BAR
          Only visible on mobile
      ========================================================= */}
      <header
        className="
          fixed
          inset-x-0
          top-0
          z-40
          flex
          h-16
          items-center
          justify-between
          border-b
          border-[#F0E1BE]
          bg-white
          px-4
          dark:border-[#3A2E17]
          dark:bg-[#211B10]
          md:hidden
        "
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <LogoMark />

          <div className="min-w-0">
            <p
              className="
                truncate
                text-base
                font-bold
                leading-tight
                text-[#241C0F]
                dark:text-[#FFF6E2]
              "
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Little Steps
            </p>

            <p
              className="
                truncate
                text-[11px]
                leading-tight
                text-[#6B5D45]
                dark:text-[#C9B896]
              "
            >
              Parent dashboard
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-[#241C0F]
            transition-colors
            hover:bg-[#FFF6E2]
            dark:text-[#FFF6E2]
            dark:hover:bg-[#2A2210]
          "
        >
          <Menu size={22} />
        </button>
      </header>

      {/* =========================================================
          MOBILE BACKDROP
      ========================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="
              fixed
              inset-0
              z-50
              bg-black/50
              md:hidden
            "
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* =========================================================
          MOBILE SIDEBAR / DRAWER
          Completely independent from desktop collapsed state
      ========================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="
              fixed
              inset-y-0
              left-0
              z-[60]
              flex
              w-[288px]
              max-w-[85vw]
              flex-col
              overflow-hidden
              border-r
              border-[#F0E1BE]
              bg-white
              shadow-2xl
              dark:border-[#3A2E17]
              dark:bg-[#211B10]
              md:hidden
            "
            aria-label="Mobile sidebar navigation"
          >
            {/* Mobile drawer header */}
            <div
              className="
                flex
                min-h-[81px]
                shrink-0
                items-center
                justify-between
                border-b
                border-[#F0E1BE]
                px-4
                py-5
                dark:border-[#3A2E17]
              "
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <LogoMark />

                <div className="min-w-0">
                  <p
                    className="
                      truncate
                      text-lg
                      font-bold
                      leading-tight
                      text-[#241C0F]
                      dark:text-[#FFF6E2]
                    "
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    Little Steps
                  </p>

                  <p
                    className="
                      truncate
                      text-xs
                      leading-tight
                      text-[#6B5D45]
                      dark:text-[#C9B896]
                    "
                  >
                    Parent dashboard
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-[#6B5D45]
                  transition-colors
                  hover:bg-[#FFF6E2]
                  dark:text-[#C9B896]
                  dark:hover:bg-[#2A2210]
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile navigation */}
            <nav
              className="
                min-h-0
                flex-1
                overflow-y-auto
                overflow-x-hidden
                px-4
                py-5
                [scrollbar-width:none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              <div className="flex w-full flex-col gap-1">
                {NAV_ITEMS.map(({ name, path, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `
                        flex
                        h-12
                        w-full
                        shrink-0
                        items-center
                        gap-3
                        rounded-xl
                        px-4
                        text-sm
                        font-medium
                        transition-colors

                        ${
                          isActive
                            ? "bg-gradient-to-r from-[#FF9500] to-[#FFC300] text-[#241C0F]"
                            : "text-[#6B5D45] hover:bg-[#FFF6E2] dark:text-[#C9B896] dark:hover:bg-[#2A2210]"
                        }
                      `
                    }
                  >
                    <Icon size={18} className="shrink-0" aria-hidden="true" />

                    <span className="min-w-0 flex-1 truncate whitespace-nowrap">
                      {name}
                    </span>
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* Mobile logout */}
            <div
              className="
                shrink-0
                border-t
                border-[#F0E1BE]
                p-4
                dark:border-[#3A2E17]
              "
            >
              <button
                type="button"
                className="
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-red-200
                  px-4
                  text-sm
                  font-medium
                  text-red-600
                  transition-colors
                  hover:bg-red-50
                  dark:border-red-900/40
                  dark:text-red-400
                  dark:hover:bg-red-950/30
                "
              >
                <LogOut size={16} className="shrink-0" aria-hidden="true" />

                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* =========================================================
          DESKTOP SIDEBAR
          Completely independent from mobile drawer
      ========================================================= */}
      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? 72 : 288,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="
          sticky
          top-0
          z-30
          hidden
          h-screen
          shrink-0
          flex-col
          overflow-hidden
          border-r
          border-[#F0E1BE]
          bg-white
          dark:border-[#3A2E17]
          dark:bg-[#211B10]
          md:flex
        "
        aria-label="Desktop sidebar navigation"
      >
        {/* Desktop header */}
        <div
          className="
            flex
            min-h-[81px]
            shrink-0
            items-center
            justify-between
            border-b
            border-[#F0E1BE]
            px-4
            py-5
            dark:border-[#3A2E17]
          "
        >
          <div
            className={`
              flex
              min-w-0
              items-center
              ${collapsed ? "w-full justify-center" : "gap-2.5"}
            `}
          >
            <LogoMark />

            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{
                    opacity: 0,
                    width: 0,
                  }}
                  animate={{
                    opacity: 1,
                    width: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                  }}
                  transition={{ duration: 0.15 }}
                  className="min-w-0 overflow-hidden whitespace-nowrap"
                >
                  <p
                    className="
                      truncate
                      text-lg
                      font-bold
                      leading-tight
                      text-[#241C0F]
                      dark:text-[#FFF6E2]
                    "
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    Little Steps
                  </p>

                  <p
                    className="
                      truncate
                      text-xs
                      leading-tight
                      text-[#6B5D45]
                      dark:text-[#C9B896]
                    "
                  >
                    Parent dashboard
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-4
            py-5
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="flex w-full flex-col gap-1">
            {NAV_ITEMS.map(({ name, path, icon: Icon }) => (
              <Tooltip key={path}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={path}
                    end={path === "/"}
                    className={({ isActive }) =>
                      `
                        flex
                        h-12
                        w-full
                        shrink-0
                        items-center
                        rounded-xl
                        text-sm
                        font-medium
                        transition-colors

                        ${
                          collapsed
                            ? "justify-center px-0"
                            : "justify-start gap-3 px-4"
                        }

                        ${
                          isActive
                            ? "bg-gradient-to-r from-[#FF9500] to-[#FFC300] text-[#241C0F]"
                            : "text-[#6B5D45] hover:bg-[#FFF6E2] dark:text-[#C9B896] dark:hover:bg-[#2A2210]"
                        }
                      `
                    }
                  >
                    <Icon size={18} className="shrink-0" aria-hidden="true" />

                    <AnimatePresence initial={false}>
                      {!collapsed && (
                        <motion.span
                          initial={{
                            opacity: 0,
                            width: 0,
                          }}
                          animate={{
                            opacity: 1,
                            width: "auto",
                          }}
                          exit={{
                            opacity: 0,
                            width: 0,
                          }}
                          transition={{ duration: 0.15 }}
                          className="
                            min-w-0
                            flex-1
                            overflow-hidden
                            truncate
                            whitespace-nowrap
                          "
                        >
                          {name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </NavLink>
                </TooltipTrigger>

                {collapsed && (
                  <TooltipContent side="right" className="text-xs">
                    {name}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>
        </nav>

        {/* Desktop logout */}
        <div
          className="
            shrink-0
            border-t
            border-[#F0E1BE]
            p-4
            dark:border-[#3A2E17]
          "
        >
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-red-200
                    text-red-600
                    transition-colors
                    hover:bg-red-50
                    dark:border-red-900/40
                    dark:text-red-400
                    dark:hover:bg-red-950/30
                  "
                >
                  <LogOut size={16} />
                </button>
              </TooltipTrigger>

              <TooltipContent side="right" className="text-xs">
                Logout
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              type="button"
              className="
                flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-200
                px-4
                text-sm
                font-medium
                text-red-600
                transition-colors
                hover:bg-red-50
                dark:border-red-900/40
                dark:text-red-400
                dark:hover:bg-red-950/30
              "
            >
              <LogOut size={16} className="shrink-0" aria-hidden="true" />

              <span>Logout</span>
            </button>
          )}
        </div>
      </motion.aside>
    </TooltipProvider>
  );
};

export default ParentSidebar;
