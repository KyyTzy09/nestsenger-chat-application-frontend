import React from "react";
import { Outlet, redirect, useNavigate } from "react-router";
import { SidebarProvider, SidebarTrigger } from "shared/shadcn/sidebar";
import DefaultSideBar from "shared/components/sidebar/default-sidebar";
import type { Route } from "../+types/root";
import { getSession } from "~/features/auth/services/get-session";
import { useGetProfile } from "~/features/profile/hooks/profile-hook";
import CropperDialog from "~/features/profile/components/cropper-dialog";
import { CropperProvider } from "shared/contexts/cropper-context";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const session = await getSession();
  if (!session) {
    throw redirect("/");
  }
  return session;
}

export default function DefaultLayout() {
  return (
    <CropperProvider>
      <SidebarProvider>
        <div className="flex min-w-screen w-full h-full min-h-screen">
          <DefaultSideBar />
          <div className="flex-1 ml-16">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
      <CropperDialog />
    </CropperProvider>
  );
}
