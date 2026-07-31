import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import Logo from "./Logo";
import UserMenu from "./UserMenu";

import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#about">About</a>

          <a href="#services">Services</a>

          <a href="#how-it-works">How It Works</a>

          <a href="#faq">FAQ</a>
        </nav>

        {!user ? (
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>

            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        ) : (
          <UserMenu />
        )}
      </div>
    </header>
  );
};

export default Navbar;
