import React from "react";
import { defaultImage } from "shared/constants/image-default";
import type { FriendType } from "shared/types/friend-type";
import { useCreateOrGetRoom } from "~/features/room/hooks/room-hooks";

interface FriendCardProps {
  data: FriendType[];
}

export default function FriendCard({ data }: FriendCardProps) {
  const { mutate: getOrCreateRoomMutation } = useCreateOrGetRoom();
  return (
    <div className="flex flex-col w-full h-full gap-1">
      {data?.map(({ id, alias, friend: { userId: friendId, avatar, bio } }) => {
        return (
          <button
            onClick={() => getOrCreateRoomMutation({ userIdB: friendId })}
            key={id}
            className={`flex items-center justify-start w-full h-full max-h-[60px] rounded-sm p-2 gap-2 hover:bg-[#45494f]`}
          >
            <section className="w-[58px] h-full">
              <img
                src={avatar || defaultImage}
                alt="Default"
                className="w-full h-full rounded-full"
              />
            </section>
            <section className="flex flex-col items-center justify-start w-full h-full p-1">
              <div className="flex flex-col items-start justify-start w-full text-sm text-white">
                <p className="text-start line-clamp-1">{alias}</p>
                <p className="text-[10px] text-gray-300 font-normal">
                  {bio || ""}
                </p>
              </div>
            </section>
          </button>
        );
      })}
    </div>
  );
}
