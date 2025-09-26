import { EditIcon, SearchIcon } from "lucide-react";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import { Sidebar, SidebarContent } from "shared/shadcn/sidebar";
import RoomCard from "~/features/room/components/cards/room-card";
import AddFriendDropdown from "~/features/friends/components/interactions/add-friend-dropdown";
import { useGetUserRoom } from "~/features/room/hooks/room-hooks";

export default function ChatSidebar() {
  const { data: userRoomResponse } = useGetUserRoom();
  return (
    <aside className="relative z-0 flex flex-col w-[30%] h-screen bg-[#282828] pt-10 text-white gap-3">
      <section className="relative flex flex-col items-start justify-center w-full h-[15%] gap-6 px-5">
        <div className="flex items-center justify-between w-full">
          <Label className="text-white font-semibold text-lg">Chats</Label>
          <AddFriendDropdown room={userRoomResponse?.data!} />
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
      <section className="flex w-full h-[90%] overflow-y-scroll custom-scrollbar px-1">
        <RoomCard data={userRoomResponse?.data!} />
      </section>
    </aside>
  );
}
