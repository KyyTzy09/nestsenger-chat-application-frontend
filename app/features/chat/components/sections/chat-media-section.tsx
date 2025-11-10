import { FileIcon, PlayIcon } from "lucide-react";
import React from "react";
import { Separator } from "shared/shadcn/separator";
import type { ChatMediaType } from "shared/types/media-type";

interface ChatMediaSectionProps {
  data: ChatMediaType;
}

export default function ChatMediaSection({
  data: { mediaUrl },
}: ChatMediaSectionProps) {
  return (
    <section className="relative w-full max-h-[400px] rounded-sm overflow-hidden bg-gray-500/40">
      {mediaUrl.endsWith("jpg") || mediaUrl.endsWith("png") ? (
        <img src={mediaUrl} alt="yaya" className="w-full h-auto object-cover" />
      ) : mediaUrl.endsWith("mp4") ? (
        <div className="w-full h-auto">
          <video className="relative w-full h-auto" src={mediaUrl}></video>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full gap-1">
          <div className="flex items-center justify-start w-full h-12 gap-1">
            <section className="w-12 h-full p-2">
              <FileIcon className="w-full h-full" />
            </section>
            <section className="max-w-[60%] h-full text-[13px] py-1">
              <p className="truncate text-sm">{mediaUrl}</p>
              <div className="flex items-center justify-start w-full">
                <p className="text-gray-300">size</p>
              </div>
            </section>
          </div>
          <Separator />
          <div className="flex items-center justify-start w-full h-auto p-2">
            <a
              href={mediaUrl}
              download
              className="bg-black/40 px-3 p-2 text-sm rounded-sm"
            >
              Unduh File
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
