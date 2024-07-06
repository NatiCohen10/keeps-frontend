import React from "react";
import NavbarDropdownAvatar from "./NavbarDropdownAvatar";
import { ModeToggle } from "../mode-toggle";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

function Navbar() {
  const { loggedInUser } = useAuth();
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>
            Taskly<span>.</span>
          </Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/tasks"}>Tasks</Link>
        </li>
        <li>
          <div>
            <ModeToggle />
            {loggedInUser ? <NavbarDropdownAvatar /> : ""}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
