import React from "react";
import { Link, useParams } from "react-router";
import { defaultImage } from "shared/constants/image-default";
import { RoomTypeEnum } from "shared/enums/room-type";
import type { FriendType } from "shared/types/friend-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";

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
            <section className="w-[60px] h-full">
              <img
                src={
                  alias
                    ? ((alias as FriendType)?.friend?.avatar ??
                      (alias as UserType)?.profile?.avatar)
                    : defaultImage
                }
                alt="Default"
                className="w-full h-full rounded-full"
              />
            </section>
            <section className="flex flex-col items-center justify-start w-full h-full p-1">
              <div className="flex w-full items-center justify-between text-sm text-white font-semibold">
                <p>
                  {room.type === RoomTypeEnum.PRIVATE && alias
                    ? (alias as FriendType).alias || (alias as UserType).email
                    : room.roomName}
                </p>
                <p className="text-[12px] font-normal">22.10</p>
              </div>
              <div className="flex items-center justify-start w-full text-[14px] text-gray-300 gap-1">
                <p>nama:</p>
                <p className="w-[40%] truncate">Haloo</p>
              </div>
            </section>
          </Link>
        );
      })}
    </div>
  );
}
