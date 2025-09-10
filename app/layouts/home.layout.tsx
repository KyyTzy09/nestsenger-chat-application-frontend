import React from "react";
import { Outlet } from "react-router";
import SideBarHome from "shared/ui/sidebar/home-sidebar";

export default function HomeLayout() {
  return (
    <div className="flex min-w-screen w-full h-full min-h-screen">
      <SideBarHome />
      <div className="flex-1 ml-14">
        <Outlet />
      </div>
    </div>
  );
}
