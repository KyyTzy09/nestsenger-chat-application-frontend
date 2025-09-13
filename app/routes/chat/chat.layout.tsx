import React from "react";
import { Outlet, redirect } from "react-router";
import { SidebarProvider } from "shared/shadcn/sidebar";
import ChatSidebar from "shared/components/sidebar/chat-sidebar";
import type { Route } from "../+types";
import { getSession } from "~/features/auth/services/get-session";

export default function ChatLayout() {
  return (
    <div className="flex w-full h-full min-h-screen">
      <ChatSidebar />
      <section className="flex w-[70%] h-full">
        <Outlet />
      </section>
    </div>
  );
}
