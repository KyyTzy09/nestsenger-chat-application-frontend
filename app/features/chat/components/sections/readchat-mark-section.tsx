import React from "react";
import { CheckCheckIcon } from "lucide-react";
import type { ReadChatType } from "shared/types/readchat-type";
import type { AliasType } from "shared/types/alias-type";

interface ReadChatMarkProps {
  readersData: { readChat: ReadChatType; alias: AliasType }[];
  chatId: string;
}

export default function ReadChatMark({
  readersData,
  chatId,
}: ReadChatMarkProps) {
  const isChatHasRead = readersData?.every(({ readChat: { isRead } }) => {
    return isRead;
  });

  return (
    <CheckCheckIcon
      className={`${!isChatHasRead ? "text-gray-400" : "text-white"} w-3 h-3`}
    />
  );
}
