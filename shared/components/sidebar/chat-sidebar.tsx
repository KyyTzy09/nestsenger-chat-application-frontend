import { SearchIcon } from "lucide-react";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import RoomCard from "~/features/room/components/cards/room-card";
import AddFriendDropdown from "~/features/friends/components/interactions/add-friend-dropdown";
import { useGetCurrentUserRoom } from "~/features/room/hooks/room-hooks";
import { useGetUserFriends } from "~/features/friends/hooks/friend-hook";
import React from "react";
import { socket } from "shared/configs/socket";
import { useQueryClient } from "@tanstack/react-query";
import { FaWhatsapp } from "react-icons/fa";

export default function ChatSidebar() {
  const queryClient = useQueryClient();
  const { data: currentUserRoomResponse } = useGetCurrentUserRoom();
  const { data: userFriendsResponse } = useGetUserFriends();

  React.useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries({
        queryKey: ["current-room"],
        type: "all",
      });
    };

    socket.on("refreshRoom", handler);

    return () => {
      socket.off("refreshRoom", handler);
    };
  }, [queryClient]);

  return (
    <aside className="relative z-0 flex flex-col w-[30%] h-screen bg-[#252525] pt-10 text-white gap-3">
      <section className="relative flex flex-col items-start justify-center w-full h-[15%] gap-6 px-5">
        <div className="flex items-center justify-between w-full">
          <Label className="text-white font-semibold text-lg">Chats</Label>
          <AddFriendDropdown friends={userFriendsResponse?.data as []} />
        </div>
        <div className="relative flex w-full h-full">
          <Input
            className="flex w-full bg-[#404040] border-blue-600 border-b-2 border-t-0 border-x-0 pl-8"
            placeholder="Cari chat atau mulai chat baru"
          />
          <div className="absolute top-0 left-0 flex items-center justify-center w-6 h-full pl-2">
            <SearchIcon className="w-4 h-full" />
          </div>
        </div>
      </section>
      <section className="flex w-full h-[90%] overflow-y-scroll custom-scrollbar px-5">
        {(currentUserRoomResponse?.data?.length as number) > 0 ? (
          <RoomCard data={currentUserRoomResponse?.data!} />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <FaWhatsapp className="w-16 h-16" />
            <p className="text-white text-xl font-semibold">Nestsenger</p>
            <p className="text-sm text-gray-400">Mulai chat baru sekarang!!</p>
          </div>
        )}
      </section>
    </aside>
  );
}
