import React from "react";
import { Outlet, redirect } from "react-router";
import { SidebarProvider } from "shared/shadcn/sidebar";
import DefaultSideBar from "shared/components/sidebar/default-sidebar";
import type { Route } from "../+types/root";
import { getSession } from "~/features/auth/services/get-session";
import AvatarCropper from "~/features/profile/components/cropper-dialog";
import ChatMediaPreview from "~/features/chat/components/chat-media-preview";
import { useSession } from "~/features/auth/hooks/auth-hook";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const session = await getSession();
  if (!session) {
    throw redirect("/");
  }
  return session;
}

export default function DefaultLayout() {
  const { data } = useSession();
  return (
    <SidebarProvider >
      <div className="flex w-screen h-full min-h-screen">
        <DefaultSideBar />
        <div className="flex-1 ml-16">
          <Outlet />
        </div>
      </div>
      <ChatMediaPreview />
      <AvatarCropper />
    </SidebarProvider>
  );
}
