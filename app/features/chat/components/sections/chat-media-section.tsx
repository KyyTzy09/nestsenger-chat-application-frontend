import { PlayIcon } from "lucide-react";
import React from "react";
import type { ChatMediaType } from "shared/types/media-type";

interface ChatMediaSectionProps {
  data: ChatMediaType;
}

export default function ChatMediaSection({
  data: { mediaUrl },
}: ChatMediaSectionProps) {
  return (
    <section className="relative w-full max-h-[400px] rounded-sm overflow-hidden">
      {mediaUrl.endsWith("jpg") || mediaUrl.endsWith("png") ? (
        <img src={mediaUrl} alt="yaya" className="w-full h-auto object-cover" />
      ) : mediaUrl.endsWith("mp4") ? (
        <>
          <video
            className="relative w-full h-auto"
            src={mediaUrl}
          ></video>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}
