import React from "react";
import { Outlet, redirect, useNavigate } from "react-router";
import { SidebarProvider, SidebarTrigger } from "shared/shadcn/sidebar";
import DefaultSideBar from "shared/components/sidebar/default-sidebar";
import type { Route } from "../+types/root";
import { getSession } from "~/features/auth/services/get-session";
import { useGetProfile } from "~/features/profile/hooks/profile-hook";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const session = await getSession();
  return session;
}

export default function DefaultLayout() {
  const { data: profile } = useGetProfile();
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
