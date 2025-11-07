import { BanIcon } from "lucide-react";
import React from "react";
import { RoomTypeEnum } from "shared/enums/room-type";
import { generateDateText2 } from "shared/helpers/generate-date";
import type { AliasType } from "shared/types/alias-type";
import type { FriendType } from "shared/types/friend-type";
import type { ProfileType } from "shared/types/profile-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import { useCountRoomUnreadChats } from "~/features/chat/hooks/readchat-hook";
import { useGetFriendById } from "~/features/friends/hooks/friend-hook";
import { useGetProfile } from "~/features/profile/hooks/profile-hook";

interface RoomLastChatSectionProps {
  room: RoomType;
  alias: AliasType;
}
export default function RoomLastChatSection({
  room,
  alias,
}: RoomLastChatSectionProps) {
  const { roomId, roomName, type: roomType } = room;
  const { data: friendResponse } = useGetFriendById({
    friendId: room.lastChat?.userId,
  });
  const { data: profileResponse } = useGetProfile();
  const { data: unreadChatsResponse } = useCountRoomUnreadChats({ roomId });

  const displayLastChatSender = () => {
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
          {roomType === RoomTypeEnum.PRIVATE && alias ? alias.name : roomName}
        </p>
        <p className="text-[12px] font-normal">
          {room?.lastChat
            ? generateDateText2({ date: new Date(room.lastChat.createdAt) })
            : ""}
        </p>
      </div>
      <div className="flex items-center justify-between w-full text-[14px] text-gray-300 gap-1">
        <p className="flex items-center w-full gap-1">
          {displayLastChatSender()}{" "}
          <span className="flex items-center gap-1 line-clamp-1">
            {room?.lastChat?.message === "Pesan ini telah dihapus" && (
              <BanIcon className="w-3 h-3" />
            )}

            {profileResponse?.data.userId === room.lastChat.userId &&
            room?.lastChat?.message === "Pesan ini telah dihapus"
              ? "Anda menghapus pesan ini"
              : room?.lastChat?.message}
          </span>
        </p>
        <p>{unreadChatsResponse?.data || 0}</p>
      </div>
    </section>
  );
}
