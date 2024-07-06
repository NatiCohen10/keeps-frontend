import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className=" flex justify-center items-center h-screen bg-gradient-to-t">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
