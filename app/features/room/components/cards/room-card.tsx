import React from "react";
import { Link, useParams } from "react-router";
import { defaultImage } from "shared/constants/image-default";
import { RoomTypeEnum } from "shared/enums/room-type";
import type { FriendType } from "shared/types/friend-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import RoomLastChatSection from "../section/room-lastchat-section";

interface RoomCardProps {
  data:
    | {
        room: RoomType;
        alias?: FriendType | UserType | null;
      }[]
    | [];
}

export default function RoomCard({ data }: RoomCardProps) {
  const params = useParams<{ chatId: string }>();
  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-2">
      {data?.map(({ room, alias }, index) => {
        return (
          <Link
            to={`/chat/${room.roomId}`}
            key={index}
            className={`${params.chatId === room.roomId ? "bg-[#45494f]" : "bg-transparent"} flex items-center justify-start w-full h-[70px] rounded-sm p-2 gap-2 hover:bg-[#45494f]`}
          >
            <section className="w-[65px] h-full rounded-full overflow-hidden">
              <img
                src={
                  alias
                    ? (alias as FriendType)?.friend?.avatar ||
                      (alias as UserType)?.profile?.avatar
                    : defaultImage
                }
                alt="Default"
                className="w-full h-full"
              />
            </section>
            <RoomLastChatSection room={room} alias={alias!} />
          </Link>
        );
      })}
    </div>
  );
}
