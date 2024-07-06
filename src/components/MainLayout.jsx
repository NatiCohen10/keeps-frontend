import { useAuth } from "../context/authContext";
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./ui/Navbar";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className=" mx-5 mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
