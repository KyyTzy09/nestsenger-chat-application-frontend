import React from "react";
import ChatDetailPage from "~/pages/chat-detail.page";

interface ChatDetailProps {
  params: { chatId: string };
}

export default function ChatDetail({ params }: ChatDetailProps) {

  return <ChatDetailPage {...params} />;
}
