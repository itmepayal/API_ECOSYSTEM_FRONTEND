"use client";

import { useState, useCallback, memo } from "react";
import { IconMenu2, IconX, IconArrowUpRight } from "@tabler/icons-react";
import { Logo } from "@/components/landing/navbar/logo";
import { NavItems } from "@/components/landing/navbar/nav-items";
import { IconButton } from "@/components/primitives/icon-button";
import { useAuthStore } from "@/store/authStore";

const NavbarComponent = () => {
  const user = useAuthStore((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="flex flex-col items-center w-full border-b border-zinc-800"
    >
      <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
        <Logo />

        <div
          id="mobile-menu"
          className={`${
            mobileOpen ? "max-lg:w-full" : "max-lg:w-0"
          } max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:z-50
          max-lg:h-full max-lg:bg-black/50 max-lg:backdrop-blur
          max-lg:flex-col max-lg:justify-center max-lg:transition-all
          max-lg:duration-300 max-lg:overflow-hidden
          flex items-center gap-8 text-sm`}
        >
          <NavItems onClick={closeMenu} />

          <IconButton
            icon={<IconX size={20} stroke={2} />}
            ariaLabel="Close menu"
            onClick={toggleMenu}
            className="lg:hidden bg-gray-900 hover:bg-gray-800 p-2 rounded-md"
          />
        </div>

        {user ? (
          <IconButton
            to="/playground"
            label="Playground"
            ariaLabel="Open API playground"
            icon={<IconArrowUpRight size={18} stroke={2} />}
            className="hidden md:flex"
          />
        ) : (
          <IconButton
            to="/login"
            label="Sign In"
            ariaLabel="Sign In"
            icon={<IconArrowUpRight size={18} stroke={2} />}
            className="hidden md:flex"
          />
        )}

        <IconButton
          icon={mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          ariaLabel="Toggle menu"
          ariaExpanded={mobileOpen}
          ariaControls="mobile-menu"
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md"
        />
      </div>
    </nav>
  );
};

export const Navbar = memo(NavbarComponent);
