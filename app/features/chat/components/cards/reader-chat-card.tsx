import { motion } from "motion/react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import type { AliasType } from "shared/types/alias-type";
import type { ReadChatType } from "shared/types/readchat-type";

interface ReaderChatDataProps {
  data: { readChat: ReadChatType; user: AliasType }[];
  type: "read" | "send" | string;
}

export default function ReaderChatCard({ data, type }: ReaderChatDataProps) {
  return (
    <div className="grid grid-cols-1 w-full gap-1">
      {data?.map(
        ({
          readChat: { chatReadId, sendAt, readAt },
          user: { alias, avatar },
        }) => {
          return (
            <motion.div
              initial={{ translateY: 20, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: 20, opacity: 0 }}
              className="flex items-center w-full h-8 justify-between text-sm rounded-sm"
              key={chatReadId}
            >
              <section className="flex items-center justify-start gap-2 max-w-[60%]">
                <img
                  className="w-5 h-5 rounded-full"
                  src={avatar || defaultImage}
                  alt="Read Chat"
                />
                <p className="truncate">{alias || "Nama Pengguna"}</p>
              </section>
              <p className="text-[12px] flex gap-1">
                {new Date(type === "read" ? readAt : sendAt).toLocaleString(
                  "id-ID",
                  {
                    dateStyle: "medium",
                  }
                )}
                {", "}
                {new Date(type === "read" ? readAt : sendAt).toLocaleTimeString(
                  "id-ID",
                  {
                    timeStyle: "short",
                  }
                )}
              </p>
            </motion.div>
          );
        }
      )}
    </div>
  );
}
