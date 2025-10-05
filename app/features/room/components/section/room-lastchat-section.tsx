import React from "react";
import { RoomTypeEnum } from "shared/enums/room-type";
import type { FriendType } from "shared/types/friend-type";
import type { ProfileType } from "shared/types/profile-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import { useGetFriendById } from "~/features/friends/hooks/friend-hook";
import { useGetProfile } from "~/features/profile/hooks/profile-hook";

interface RoomLastChatSectionProps {
  room: RoomType;
  alias: FriendType | UserType | null;
}

export default function RoomLastChatSection({
  room,
  alias,
}: RoomLastChatSectionProps) {
  const { roomName, type: roomType } = room;

  const { data: friendResponse, isPending: onFriendLoading } = useGetFriendById(
    { friendId: room.lastChat?.userId }
  );
  const { data: profileResponse, isPending: onProfileLoading } =
    useGetProfile();

  const displayLastChatData = () => {
    let result = "";
    if (roomType === RoomTypeEnum.GROUP) {
      if (friendResponse?.data) {
        result = friendResponse.data.alias + ": ";
      } else if (profileResponse?.data.userId === room?.lastChat?.userId) {
        result = "Anda :";
      } else {
        result = room?.lastChat?.sender?.email
          ? "~" + room?.lastChat?.sender?.email + ": "
          : "";
      }
    } else {
      result = "";
    }
    return result;
  };

  return (
    <section className="flex flex-col items-center justify-start w-full h-full p-1">
      <div className="flex w-full items-start justify-between text-sm text-white font-semibold">
        <p className="max-w-40 truncate">
          {roomType === RoomTypeEnum.PRIVATE && alias
            ? (alias as FriendType).alias || (alias as UserType).email
            : roomName}
        </p>
        <p className="text-[12px] font-normal">
          {room?.lastChat
            ? new Date(room.lastChat?.updatedAt!).toLocaleTimeString()
            : ""}
        </p>
      </div>
      <div className="flex items-center justify-start w-full text-[14px] text-gray-300 gap-1">
        <p className="line-clamp-1">{`${displayLastChatData()} ${room?.lastChat?.message || ""}`}</p>
      </div>
    </section>
  );
}
