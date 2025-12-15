import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import ChatSidebar from "~/features/chat/components/chat-sidebar";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen">
      <section className="flex md:hidden w-full h-screen">
        <ChatSidebar />
      </section>
      <div className="hidden md:flex flex-col items-center justify-center w-full h-full min-h-screen bg-[#232323] text-gray-400">
        <FaWhatsapp className="w-10 h-10" />
        <p className="text-white text-lg font-semibold">Nestsenger</p>
        <p className="text-sm">Belum ada chat yang dibuka</p>
      </div>
    </div>
  );
}
