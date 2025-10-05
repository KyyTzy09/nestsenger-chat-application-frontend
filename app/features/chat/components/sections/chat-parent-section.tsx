import React from "react";
import { useGetChatParent } from "../../hooks/chat-hook";
import type { FriendType } from "shared/types/friend-type";
import type { UserType } from "shared/types/user-type";

interface ChatParentSectionProps {
  chatId: string;
}

export default function ChatParentSection({ chatId }: ChatParentSectionProps) {
  const { data: chatParentResponse } = useGetChatParent({ chatId });
  const { chat, alias } = chatParentResponse?.data || {};

  return (
    <section className="flex flex-col items-start justify-between w-full h-auto p-2 bg-gray-500/40 rounded-md border-l-[5px] border-blue-700">
      <p className="flex items-center justify-start w-full text-[12px] text-gray-300 font-semibold">
        {alias
          ? (alias as FriendType)?.alias || "~" + (alias as UserType)?.email
          : "name"}
      </p>
      <p className="line-clamp-1 text-[11px] text-gray-300">{chat?.message}</p>
    </section>
  );
}
