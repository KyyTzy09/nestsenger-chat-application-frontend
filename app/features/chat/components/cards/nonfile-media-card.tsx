import { Music2Icon } from "lucide-react";
import React from "react";
import type { ChatMediaType } from "shared/types/media-type";

interface ChatNonFIleMediaCardProps {
  data: ChatMediaType[];
  onClickAction: (i: string) => void;
}

export default function NonFileMediaCard({
  data,
  onClickAction,
}: ChatNonFIleMediaCardProps) {
  return (
    <div className="grid grid-cols-3 items-start justify-center w-full h-full py-1 gap-2">
      {data?.length! > 0 &&
        data?.map(({ mediaName, mediaType, mediaUrl, chatId }, i) => {
          return (
            <div
              key={i}
              onClick={() => onClickAction(chatId)}
              className={`w-full h-24 rounded-sm overflow-hidden border-1 hover:border-blue-500 hover:border-2`}
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
                <div className="w-full h-full p-1 bg-gray-300">
                  <Music2Icon
                    strokeWidth={2}
                    className="w-full h-full text-blue-500"
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
