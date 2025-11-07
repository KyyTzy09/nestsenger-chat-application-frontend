import React from "react";
import { useGetIsChatHasRead } from "../../hooks/readchat-hook";
import { CheckCheckIcon, Loader2Icon } from "lucide-react";

interface ReadChatMarkProps {
  chatId: string;
}

export default function ReadChatMark({ chatId }: ReadChatMarkProps) {
  const { data: isChatHasRead, isPending } = useGetIsChatHasRead({ chatId });
  return (
    <CheckCheckIcon
      className={`${!isChatHasRead?.data|| isPending ? "text-gray-400" : "text-white"} w-3 h-3`}
    />
  );
}
