import React from "react";
import { MemberRole } from "shared/enums/member-role";
import { Separator } from "shared/shadcn/separator";
import type { FriendType } from "shared/types/friend-type";
import type { MemberType } from "shared/types/member-type";
import type { UserType } from "shared/types/user-type";
import MemberCard from "~/features/member/components/member-card";

interface RoomMemberSectionProps {
  data: {
    member: MemberType;
    alias: FriendType | UserType | null;
  }[];
  currentUserId: string;
}

export default function RoomMemberSection({
  data,
  currentUserId,
}: RoomMemberSectionProps) {
  const sortedMemberData = data?.sort((a, b) => {
    const getPriority = (
      item: { member: MemberType, alias: FriendType | UserType | null }) => {
      if (item?.member?.userId === currentUserId) return 0;
      if (item?.member?.role === MemberRole.ADMIN) return 1;
      return 2;
    };

    return getPriority(a) - getPriority(b);
  });

  return (
    <section className="flex flex-col w-full h-full gap-5">
      <div className="flex items-center justify-between w-full">
        <p className="font-bold text-white text-xl">
          Anggota ({data?.length || 0})
        </p>
      </div>
      <Separator />
      <div className="flex w-full h-full">
        <MemberCard data={sortedMemberData} currentUserId={currentUserId} />
      </div>
    </section>
  );
}
