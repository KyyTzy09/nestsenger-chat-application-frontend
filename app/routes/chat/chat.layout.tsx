import React from "react";
import { Outlet } from "react-router";
import ChatSidebar from "shared/components/sidebar/chat-sidebar";

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
