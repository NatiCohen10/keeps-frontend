import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import NavbarDropdownAvatar from "./NavbarDropdownAvatar";
import { ModeToggle } from "../mode-toggle";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useClickAway } from "@uidotdev/usehooks";

function TopNavLink(props) {
  const { href, children } = props;
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "text-primary border-b-2 border-transparent hover:border-primary transition-all duration-300"
          : "border-b-2 border-transparent hover:border-primary transition-all duration-300"
      }
      to={href}
    >
      {children}
    </NavLink>
  );
}

function Navbar() {
  const { loggedInUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuRef = useClickAway(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen((prev) => !prev);
    }
  });

  // const mobileMenuRef = useRef(null);

  // useClickAway(mobileMenuRef, () => {
  //   if (isMobileMenuOpen) {
  //     setIsMobileMenuOpen(false);
  //   }
  // });

  return (
    <nav
      ref={mobileMenuRef}
      className="bg-card shadow-md sticky top-0 left-0 py-3 z-50"
    >
      <div className=" mx-5 md:mx-10 lg:mx-14 xl:mx-20">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 my-auto">
              <div className="text-2xl font-bold ">
                <TopNavLink href="/">
                  Taskly<span>.</span>
                </TopNavLink>
              </div>
            </div>
            <div className="hidden sm:flex sm:ml-10 sm:space-x-8 my-auto">
              <TopNavLink href="/contact">Contact</TopNavLink>
              <TopNavLink href="/about">About</TopNavLink>
              <TopNavLink href="/tasks">Tasks</TopNavLink>
            </div>
          </div>

          <div className="flex gap-3 items-center sm:hidden">
            <div className="flex justify-end gap-4">
              <ModeToggle />
              {loggedInUser && <NavbarDropdownAvatar />}
            </div>
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu />
            </button>
          </div>

          <div className="hidden sm:flex sm:items-center sm:gap-5">
            <ModeToggle />
            {loggedInUser && <NavbarDropdownAvatar />}
          </div>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className={cn("sm:hidden transition-all duration-300", {
          "max-h-0 opacity-0 overflow-hidden": !isMobileMenuOpen,
          "max-h-96 opacity-100": isMobileMenuOpen,
        })}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="flex flex-col justify-center items-center gap-2">
            <TopNavLink href="/">Home</TopNavLink>
            <TopNavLink href="/contact">Contact</TopNavLink>
            <TopNavLink href="/about">About</TopNavLink>
            <TopNavLink href="/tasks">Tasks</TopNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
