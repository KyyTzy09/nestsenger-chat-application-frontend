import React from "react";
import { defaultImage } from "shared/constants/image-default";
import type { AliasType } from "shared/types/alias-type";
import type { ReadChatType } from "shared/types/readchat-type";

interface ReaderChatDataProps {
  data: { readChat: ReadChatType; alias: AliasType }[];
  type: "read" | "send" | string;
}

export default function ReaderChatCard({ data, type }: ReaderChatDataProps) {
  return (
    <div className="grid grid-cols-1 w-full gap-1">
      {data?.map(
        ({
          readChat: { chatReadId, sendAt, readAt },
          alias: { name, avatar },
        }) => {
          return (
            <div
              className="flex items-center w-full h-8 justify-between text-[12px] rounded-sm"
              key={chatReadId}
            >
              <section className="flex items-center justify-start gap-2">
                <img
                  className="w-5 h-5 rounded-full"
                  src={avatar || defaultImage}
                  alt="Read Chat"
                />
                <p className="line-clamp-1">{name || "Nama Pengguna"}</p>
              </section>
              <p className="flex gap-1">
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
            </div>
          );
        }
      )}
    </div>
  );
}
