import React from "react";
import { useGetChatParent } from "../../hooks/chat-hook";
import type { FriendType } from "shared/types/friend-type";
import type { UserType } from "shared/types/user-type";
import { FileIcon, MusicIcon } from "lucide-react";

interface ChatParentSectionProps {
  currentUserId: string;
  chatId: string;
}

export default function ChatParentSection({
  currentUserId,
  chatId,
}: ChatParentSectionProps) {
  const { data: chatParentResponse } = useGetChatParent({ chatId });
  const { chat, user } = chatParentResponse?.data || {};

  return (
    <section className={`${chat?.media && "min-w-[150px]"} flex items-start justify-between h-auto max-h-16 bg-gray-500/40 rounded-md border-l-[5px] border-blue-700 overflow-hidden`}>
      <div className="flex flex-col items-center justify-between w-auto h-full p-2">
        <p className="flex items-center justify-start w-full text-[12px] text-gray-300 font-semibold">
          {user && currentUserId === chat?.userId ? "Anda" : user?.alias}
        </p>
        <p className="flex items-center justify-start line-clamp-1 text-[11px] text-gray-300 gap-1">
          {chat?.media && chat?.media?.mediaType === "audio" ? (
            <MusicIcon className="w-4 h-4" />
          ) : chat?.media?.mediaType === "file" ? (
            <FileIcon className="w-4 h-4" />
          ) : null}
          {chat?.message}
        </p>
      </div>
      <div className="w-12 min-h-12 h-full max-h-20 rounded-r-sm overflow-hidden">
        {chat?.media && chat?.media?.mediaType === "image" ? (
          <img
            title="media"
            className="w-full min-h-12 h-full object-cover"
            src={chat?.media.mediaUrl}
          />
        ) : chat?.media?.mediaType === "video" ? (
          <video className="w-full min-h-12 h-full object-contain" src={chat?.media.mediaUrl}></video>
        ) : null}
      </div>
    </section>
  );
}
