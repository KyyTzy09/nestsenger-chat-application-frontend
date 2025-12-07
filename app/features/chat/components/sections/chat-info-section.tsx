import { CheckCheckIcon } from "lucide-react";
import React from "react";
import ReaderChatCard from "../cards/reader-chat-card";
import { useGetReadChats } from "../../hooks/readchat-hook";
import { motion } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "shared/configs/socket";
import type { ReadChatType } from "shared/types/readchat-type";
import type { AliasType } from "shared/types/alias-type";

interface ChatInfoSectionProps {
  readersData: { readChat: ReadChatType; alias: AliasType }[];
  chatId: string;
}

export default function ChatInfoSection({
  readersData,
}: ChatInfoSectionProps) {
  const filteredData = (type: boolean): [] => {
    return readersData?.filter(({ readChat: { isRead } }) => {
      return isRead === type;
    }) as [];
  };

  // Handle contents
  const infoContents = [
    {
      type: "read",
      text: "Dibaca Oleh",
      Icon: <CheckCheckIcon className="w-4 h-4 text-blue-500" />,
      data: filteredData(true),
    },
    {
      type: "send",
      text: "Terkirim",
      Icon: <CheckCheckIcon className="w-4 h-4" />,
      data: filteredData(false),
    },
  ];

  return (
    <motion.section
      initial={{ translateY: 20, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: 20, opacity: 0 }}
      className="flex flex-col items-center justify-start w-full h-full max-h-72 p-2 overflow-y-auto custom-scroll gap-2"
    >
      {infoContents.map(({ type, text, Icon, data }) => {
        return (
          <React.Fragment key={type}>
            {data?.length > 0 && (
              <div className="flex flex-col w-full gap-2">
                <p className="flex items-center justify-start text-sm gap-2 px-1">
                  {Icon}
                  {text}
                </p>
                <ReaderChatCard data={data} type={type} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </motion.section>
  );
}
