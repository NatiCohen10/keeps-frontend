import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./ui/Navbar";

function MainLayout() {
  return (
    <div className=" ">
      <Navbar />
      <div className=" mx-5 mt-4 md:mx-10 lg:mx-14 xl:mx-20">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
