import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { MemberRole } from "shared/enums/member-role";
import type { FriendType } from "shared/types/friend-type";
import type { MemberType } from "shared/types/member-type";
import type { UserType } from "shared/types/user-type";
import { useCreateOrGetRoom } from "~/features/room/hooks/room-hooks";

interface MemberCardData {
  data: {
    member: MemberType;
    alias: FriendType | UserType | null;
  }[];
  currentUserId: string;
}

export default function MemberCard({ data, currentUserId }: MemberCardData) {
  const { mutate: getOrCreateRoomMutation } = useCreateOrGetRoom();
  const generateMemberName = (userId: string, userName: string): string => {
    let result: string = "";
    if (userId === currentUserId) {
      result = "Anda";
    } else {
      result = userName;
    }

    return result;
  };

  return (
    <div className="flex flex-col w-full h-full gap-1">
      {data?.map(({ member: { userId, role }, alias }) => {
        return (
          <button
            disabled={currentUserId === userId}
            onClick={() => getOrCreateRoomMutation({ userIdB: userId })}
            key={userId}
            className={`relative flex items-center justify-start w-full h-full max-h-[60px] rounded-sm p-2 gap-2 hover:bg-[#45494f]`}
          >
            {role === MemberRole.ADMIN && (
              <p className="absolute right-1 top-1 text-[10px] px-2 bg-black/30 backdrop-blur rounded-sm">
                {role.toLowerCase()}
              </p>
            )}
            <section className="w-[58px] h-full">
              <img
                src={
                  alias
                    ? (alias as FriendType)?.friend?.avatar ||
                      (alias as UserType)?.profile?.avatar
                    : defaultImage
                }
                alt="Default"
                className="w-full h-full rounded-full"
              />
            </section>
            <section className="flex flex-col items-center justify-start w-full h-full p-1">
              <div className="flex flex-col items-start justify-start w-full text-sm text-white">
                <p className="text-start line-clamp-1">
                  {generateMemberName(
                    userId,
                    alias
                      ? (alias as FriendType)?.alias ||
                          (alias as UserType)?.email
                      : ""
                  )}
                </p>
                <p className="text-[10px] text-gray-300 font-normal">
                  {alias && (alias as FriendType).friend
                    ? (alias as FriendType)?.friend?.bio
                    : currentUserId === userId
                      ? (alias as UserType)?.profile?.bio
                      : "~" + (alias as UserType)?.profile?.userName}
                </p>
              </div>
            </section>
          </button>
        );
      })}
    </div>
  );
}
