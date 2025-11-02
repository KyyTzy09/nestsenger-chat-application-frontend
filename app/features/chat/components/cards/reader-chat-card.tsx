import React from "react";
import { defaultImage } from "shared/constants/image-default";

interface ReaderChatDataProps {
  data: [];
}

export default function ReaderChatCard({ data }: ReaderChatDataProps) {
  return (
    <div className="grid grid-cols-1 w-full gap-1">
      {data?.map((v, i) => {
        return (
          <div
            className="flex items-center w-full h-8 justify-between text-[12px] rounded-sm"
            key={i}
          >
            <section className="flex items-center justify-start gap-2">
              <img
                className="w-5 h-5 rounded-full"
                src={defaultImage}
                alt="Read Chat"
              />
              <p className="line-clamp-1">Nama Pengguna</p>
            </section>
            <p className="flex gap-1">
              {new Date().toLocaleString("id-ID", {
                dateStyle: "medium",
              })}
              {", "}
              {new Date().toLocaleTimeString("id-ID", {
                timeStyle: "short",
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
}
