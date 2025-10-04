import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { RoomTypeEnum } from "shared/enums/room-type";
import { Label } from "shared/shadcn/label";
import type { FriendType } from "shared/types/friend-type";
import type { MemberType } from "shared/types/member-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import RoomInfoDropdown from "~/features/room/components/interactions/room-dropdown";

interface ChatNavbarProps {
  roomInfo: {
    room: RoomType;
    alias: FriendType | UserType | null;
  };
  memberInfo: {
    member: MemberType;
    alias: FriendType | UserType | null;
  }[];
  currentUserId: string;
}

export default function ChatNavbar({ roomInfo, memberInfo, currentUserId }: ChatNavbarProps) {
  const {
    room: { roomName, type },
    alias,
  } = roomInfo;

  return (
    <>
      <RoomInfoDropdown info={roomInfo} member={memberInfo} currentUserId={currentUserId} />
      <nav className="flex items-center justify-between w-full h-[70px] bg-[#252525] border border-black p-5">
        <section className="group flex items-center justify-start w-full h-full max-w-[80%] gap-5">
          <button className="w-10 h-10">
            <img
              src={
                alias
                  ? (alias as UserType)?.profile?.avatar ||
                    (alias as FriendType)?.friend?.avatar
                  : defaultImage
              }
              alt="yaya"
              className="w-full h-full rounded-full group-hover:opacity-75"
            />
          </button>
          <div className="flex flex-col font-semibold text-white gap-1">
            <Label className="">
              {type === RoomTypeEnum.GROUP
                ? roomName
                : (alias && (alias as UserType)?.email) ||
                  (alias as FriendType)?.alias}
            </Label>
            <Label className="text-[10px] text-gray-300 font-normal">
              Klik untuk info {type === RoomTypeEnum.GROUP ? "Grup" : "Kontak"}
            </Label>
          </div>
        </section>
      </nav>
    </>
  );
}
