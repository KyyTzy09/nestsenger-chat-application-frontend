import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { RoomTypeEnum } from "shared/enums/room-type";
import { Label } from "shared/shadcn/label";
import type { FriendType } from "shared/types/friend-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";

interface ChatNavbarProps {
  data: {
    room: RoomType;
    alias: FriendType | UserType | null;
  };
}

export default function ChatNavbar({ data }: ChatNavbarProps) {
  const {
    room: { roomName, type },
    alias,
  } = data;

  return (
    <nav className="flex items-center justify-between w-full h-[70px] bg-[#252525] border border-black p-5">
      <section className="group flex items-center justify-start h-full max-w-[80%] gap-5">
        <div className="w-10 h-10">
          <img
            src={alias ? (alias as UserType).profile.avatar : defaultImage}
            alt="yaya"
            className="w-full h-full rounded-full group-hover:opacity-75"
          />
        </div>
        <div className="flex flex-col font-semibold text-white gap-1">
          <Label className="">
            {type === RoomTypeEnum.GROUP
              ? roomName
              : (alias && (alias as UserType).email) ||
                (alias as FriendType).friend.userName}
          </Label>
          <Label className="text-[10px] text-gray-300 font-normal">
            Klik untuk info kontak
          </Label>
        </div>
      </section>
    </nav>
  );
}
