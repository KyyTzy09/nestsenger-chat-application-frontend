import React from "react";
import { Outlet } from "react-router";
import { SidebarProvider } from "shared/shadcn/sidebar";
import DefaultSideBar from "shared/ui/sidebar/default-sidebar";

export default function DefaultLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-w-screen w-full h-full min-h-screen">
        <DefaultSideBar />
        <div className="flex-1 ml-16">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
