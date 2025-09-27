import { EditIcon, SearchIcon, UserPlus2Icon } from "lucide-react";
import React from "react";
import { Button } from "shared/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "shared/shadcn/dropdown-menu";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import type { FriendType } from "shared/types/friend-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import RoomCard from "~/features/room/components/cards/room-card";
import AddFriendDialog from "../add-friend-dialog";

interface AddFriendDropdownProps {
  room:
    | {
        room: RoomType;
        alias?: FriendType | UserType | null;
      }[]
    | [];
}

export default function AddFriendDropdown({ room }: AddFriendDropdownProps) {
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  return (
    <>
      <AddFriendDialog isOpen={showDialog} setIsOpen={setShowDialog} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-transparent p-0">
            <EditIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col items-center justify-between w-[350px] h-[36rem] bg-[#252525] overflow-hidden p-2 gap-2">
          <section className="flex flex-col w-full p-2 gap-2">
            <div className="flex items-center justify-between w-full">
              <Label className="text-white font-semibold text-lg">
                Chat Baru
              </Label>
            </div>
            <div className="relative flex w-full h-full text-white">
              <Input
                className="flex w-full bg-[#404040] border-blue-600 border-b-2 border-t-0 border-x-0 pl-8"
                placeholder="Cari chat atau mulai chat baru"
              />
              <div className="absolute top-0 left-0 flex items-center justify-center w-6 h-full pl-2">
                <SearchIcon className="w-4 h-full" />
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center justify-start w-full h-full overflow-y-scroll custom-scrollbar gap-1">
            <Button
              onClick={() => setShowDialog(true)}
              className="flex item-center justify-start w-full h-14 bg-transparent px-2 gap-3 hover:bg-[#45494f]"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#353535] rounded-full">
                <UserPlus2Icon className="w-5 h-5" />
              </div>
              <Label className="font-semibold text-white">Tambah Teman</Label>
            </Button>
            <RoomCard data={room} />
          </section>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
