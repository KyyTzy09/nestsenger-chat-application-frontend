import React from "react";
import type { ChatMediaType } from "shared/types/media-type";
import NonFileMediaCard from "~/features/chat/components/cards/nonfile-media-card";
import { useMediaPreviewStore } from "~/features/chat/stores/media-preview-store";

interface RoomMediaSectionProps {
  media: ChatMediaType[];
}

export default function RoomMediaSection({ media }: RoomMediaSectionProps) {
  const { setChatId, setOpenPreview } = useMediaPreviewStore();
  return (
    <section className="flex flex-col w-full h-full gap-5">
      <div className="flex items-center justify-between w-full">
        <p className="text-white font-semibold text-lg">
          Media ({media?.length || 0})
        </p>
      </div>
      <div className="flex w-full">
        <NonFileMediaCard
          data={media}
          onClickAction={(chatId) => {
            if (chatId) {
              setChatId(chatId);
              setOpenPreview(true);
            }
          }}
          selectedIndex={0}
        />
      </div>
    </section>
  );
}
