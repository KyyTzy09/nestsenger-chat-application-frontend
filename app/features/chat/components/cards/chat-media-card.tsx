import { Music2Icon } from "lucide-react";
import React from "react";
import type { ChatMediaType } from "shared/types/media-type";

interface ChatMediaCardProps {
  data: ChatMediaType[];
  selectedIndex: number;
  onClickAction: (i : number) => void;
}

export default function ChatMediaCard({ data, selectedIndex, onClickAction }: ChatMediaCardProps) {
  return (
    <div className="flex flex-row items-center w-full h-full py-1 gap-2 overflow-x-auto no-scrollbar">
      {data?.length! > 0 &&
        data?.map(({ mediaName, mediaType, mediaUrl }, i) => {
          return (
            <div
              key={i}
              onClick={() => onClickAction(i)}
              className={`w-12 h-12 rounded-sm overflow-hidden ${selectedIndex === i ? "border-blue-500 border-3" : "border-1"}`}
            >
              {mediaType === "image" ? (
                <img
                  className="w-full h-full object-cover"
                  src={mediaUrl}
                  alt={mediaName}
                />
              ) : mediaType === "video" ? (
                <video
                  src={mediaUrl}
                  className="w-full h-full object-cover"
                ></video>
              ) : (
                <div className="w-full h-full p-1">
                  <Music2Icon className="w-full h-full " />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
