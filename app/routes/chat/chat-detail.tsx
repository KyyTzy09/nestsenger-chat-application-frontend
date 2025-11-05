import React from "react";
import ChatDetailPage from "~/pages/chat-detail.page";
import type { Route } from "../+types";
import { socket } from "shared/configs/socket";
import { ReadChatService } from "~/features/chat/services/readchat-service";

interface ChatDetailProps {
  params: { roomId: string };
}

export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
  const roomId = (params as { chatId: string }).chatId;
  socket.emit("joinRoom", { roomId });
  await ReadChatService.readChat({ roomId });
};

export default function ChatDetail({ params }: ChatDetailProps) {
  return <ChatDetailPage {...params} />;
}
