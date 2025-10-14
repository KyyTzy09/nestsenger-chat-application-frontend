import React from "react";
import { Outlet } from "react-router";
import ChatSidebar from "shared/components/sidebar/chat-sidebar";
import type { Route } from "../+types/root";
import { socket } from "shared/configs/socket";
import { toast } from "sonner";

export const clientLoader = ({}: Route.ClientLoaderArgs) => {
  socket.emit("get-current-room");
  toast.success("Berhasil join all-room")
};

export default function ChatLayout() {
  return (
    <div className="flex w-full min-h-screen">
      <ChatSidebar />
      <section className="flex w-[70%] h-full">
        <Outlet />
      </section>
    </div>
  );
}
