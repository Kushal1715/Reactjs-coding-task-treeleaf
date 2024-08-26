import React from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <nav className="w-64 h-screen fixed top-0 left-0">
        <Nav />
      </nav>

      <div className="ml-64 w-full overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
