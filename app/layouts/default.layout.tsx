import React from "react";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "shared/shadcn/sidebar";
import DefaultSideBar from "shared/components/sidebar/default-sidebar";
import type { Route } from "../+types/root";
import { AuthMiddleware } from "shared/middlewares/auth-middleware";

export const middleware: Route.unstable_MiddlewareFunction[] = [AuthMiddleware];

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
