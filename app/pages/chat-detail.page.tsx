import React from "react";
import ChatNavbar from "~/features/chat/components/chat-navbar";

interface ChatDetailPageProps {
  chatId: string;
}

export default function ChatDetailPage({ chatId }: ChatDetailPageProps) {
  return (
    <div className="relative flex flex-col  w-full h-screen">
      <ChatNavbar />
      <section className="w-full h-full p-5">
        <p>{chatId}</p>
      </section>
    </div>
  );
}
