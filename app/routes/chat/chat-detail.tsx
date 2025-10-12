import React from "react";
import ChatDetailPage from "~/pages/chat-detail.page";
import type { Route } from "../+types";
import { socket } from "shared/configs/socket";
import { toast } from "sonner";

interface ChatDetailProps {
  params: { chatId: string };
}

export const clientLoader = ({ params }: Route.ClientLoaderArgs) => {
  const roomId = (params as { chatId: string }).chatId;
  socket.emit("joinRoom", { roomId });
};

export default function ChatDetail({ params }: ChatDetailProps) {
  return <ChatDetailPage {...params} />;
}
