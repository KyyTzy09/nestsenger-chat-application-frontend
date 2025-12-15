import React from "react";
import { Outlet } from "react-router";
import ChatSidebar from "~/features/chat/components/chat-sidebar";
import type { Route } from "../+types/root";
import { socket } from "shared/configs/socket";

export const clientLoader = ({}: Route.ClientLoaderArgs) => {
  socket.emit("get-current-room");
};

export default function ChatLayout() {
  return (
    <div className="flex w-full min-h-screen">
      <section className="hidden md:flex w-[30%] h-screen">
        <ChatSidebar />
      </section>
      <section className="md:flex md:w-[70%] w-full h-full ">
        <Outlet />
      </section>
    </div>
  );
}
