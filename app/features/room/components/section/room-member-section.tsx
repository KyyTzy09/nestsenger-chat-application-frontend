import React from "react";
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
    const isA = a?.member?.userId === currentUserId;
    const isB = b?.member?.userId === currentUserId;
    if (isA && !isB) return -1;
    if (!isA && isB) return 1;
    return 0;
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
