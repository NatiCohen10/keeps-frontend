import React from "react";
import NavbarDropdownAvatar from "./NavbarDropdownAvatar";
import { ModeToggle } from "../mode-toggle";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function TopNavLink(props) {
  const { href, children } = props;
  return (
    <NavLink
      className={({ isActive }) => {
        return isActive
          ? "text-primary border-b-2 border-transparent hover:border-primary transition-all duration-300"
          : "border-b-2 border-transparent hover:border-primary transition-all duration-300";
      }}
      to={href}
    >
      {children}
    </NavLink>
  );
}

function Navbar() {
  const { loggedInUser } = useAuth();
  return (
    <nav className=" bg-card shadow-md sticky top-0 left-0 py-3 z-50">
      <ul className=" flex justify-between items-center mx-5">
        <li className=" text-2xl font-bold">
          <TopNavLink href="/">
            Taskly<span>.</span>
          </TopNavLink>
        </li>
        <li className=" flex gap-3 flex-col justify-center items-center sm:flex-row sm:gap-10">
          <TopNavLink href="/contact">Contact</TopNavLink>
          <TopNavLink href="/about">About</TopNavLink>
          <TopNavLink href="/tasks">Tasks</TopNavLink>
        </li>
        <li className=" flex gap-2 sm:gap-5">
          <ModeToggle />
          {loggedInUser ? <NavbarDropdownAvatar /> : ""}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
