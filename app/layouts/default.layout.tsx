import React from "react";
import { Outlet } from "react-router";
import DefaultSideBar from "shared/ui/sidebar/default-sidebar";

export default function DefaultLayout() {
  return (
    <div className="flex min-w-screen w-full h-full min-h-screen">
      <DefaultSideBar />
      <div className="flex-1 ml-14">
        <Outlet />
      </div>
    </div>
  );
}
