import { useState } from "react";
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
  LucideHome,
  Menu,
  X,
} from "lucide-react";

const LogoMark = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden>
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

const menus = [
  { name: "Home", path: "/", icon: LucideHome },
  { name: "Dashboard", path: "/parent/dashboard", icon: LayoutDashboard },
  { name: "My bookings", path: "/parent/my-bookings", icon: CalendarCheck },
  { name: "Browse centers", path: "/parent/centers", icon: Building2 },
  { name: "Payments", path: "/parent/payments", icon: CreditCard },
  { name: "Profile", path: "/parent/profile", icon: User },
];

const ParentSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-[#241C0F] hover:bg-[#FFF6E2] dark:text-[#FFF6E2] dark:hover:bg-[#2A2210]"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Overlay backdrop — only rendered/visible while drawer is open on mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-hidden
        />
      )}

      {/* Sidebar:
          - Mobile: fixed off-canvas drawer, slides in/out with translate-x, hidden via -translate-x-full by default
          - Desktop (md+): static, always visible, normal flow */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-[#F0E1BE] bg-white transition-transform duration-300 ease-in-out dark:border-[#3A2E17] dark:bg-[#211B10] md:sticky md:top-0 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-2.5 border-b border-[#F0E1BE] p-6 dark:border-[#3A2E17]">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <div>
              <h2
                className="text-lg font-bold text-[#241C0F] dark:text-[#FFF6E2]"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                Little Steps
              </h2>
              <p className="text-xs text-[#6B5D45] dark:text-[#C9B896]">
                Parent dashboard
              </p>
            </div>
          </div>

          {/* Close button — only shows on mobile drawer */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-[#6B5D45] hover:bg-[#FFF6E2] dark:text-[#C9B896] dark:hover:bg-[#2A2210] md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-[#FF9500] to-[#FFC300] text-[#241C0F]"
                      : "text-[#6B5D45] hover:bg-[#FFF6E2] dark:text-[#C9B896] dark:hover:bg-[#2A2210]"
                  }`
                }
              >
                <Icon size={18} />
                <span>{menu.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#F0E1BE] p-4 dark:border-[#3A2E17]">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-950/30">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default ParentSidebar;
