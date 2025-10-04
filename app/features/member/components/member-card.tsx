import React from "react";
import { defaultImage } from "shared/constants/image-default";
import type { FriendType } from "shared/types/friend-type";
import type { MemberType } from "shared/types/member-type";
import type { UserType } from "shared/types/user-type";

interface MemberCardData {
  data: {
    member: MemberType;
    alias: FriendType | UserType | null;
  }[];
}

export default function MemberCard({ data }: MemberCardData) {
  return (
    <div className="flex flex-col w-full h-full gap-3">
      {data.map(({ member: { userId }, alias }) => {
        return (
          <div
            key={userId}
            className={`flex items-center justify-start w-full h-[70px] rounded-sm p-2 gap-2 hover:bg-[#45494f]`}
          >
            <section className="w-[75px] h-full">
              <img
                src={alias ? (alias as FriendType)?.friend.avatar || (alias as UserType)?.profile.avatar : defaultImage}
                alt="Default"
                className="w-full h-full rounded-full"
              />
            </section>
            <section className="flex flex-col items-center justify-start w-full h-full p-1">
              <div className="flex items-center justify-between w-full text-sm text-white font-semibold">
                <p>{alias ? (alias as FriendType)?.alias || (alias as UserType)?.email : ""}</p>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}
