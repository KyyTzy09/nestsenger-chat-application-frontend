import { SearchIcon, TimerIcon } from "lucide-react";
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
import { defaultImage } from "shared/constants/image-default";

export default function StatusSidebar() {
  return (
    <aside className="relative z-0 flex flex-col w-full h-full bg-[#252525] pt-10 text-white gap-4">
      <div className="flex items-center justify-between w-full px-5">
        <Label className="text-white font-semibold text-lg">Status</Label>
      </div>
      <div className="flex flex-col items-center justify-start w-full h-full overflow-y-scroll custom-scrollbar gap-4">
        <section className="relative flex flex-col items-start justify-center w-full h-[15%] gap-6 px-5 ">
          <div className="relative flex w-full h-full">
            <div className="flex items-center justify-start w-full h-16 gap-3">
              <div className="w-14 h-14 border-[3px] border-blue-500 rounded-full">
                <img
                  src={defaultImage}
                  alt={"profile"}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col items-start justify-center h-full text-white">
                <p className="font-semibold text-[14px]">Fiky Ganteng 1</p>
                <p className="text-sm">
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                  })}
                  {", "}
                  {new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col w-full h-[90%] px-5 gap-2">
          <Label className="flex items-center justify-start text-gray-300 text-sm gap-1">
            <TimerIcon className="w-[14px] h-[14px]" />
            Pembaruan Terkini
          </Label>
          <div className="flex flex-col w-full h-full gap-2">
            {Array.from({ length: 100 }).map(() => {
              return (
                <div className="flex items-center justify-start w-full h-16 gap-3 py-2">
                  <div className="w-14 h-14 border-[3px] border-blue-500 rounded-full">
                    <img
                      src={defaultImage}
                      alt={"profile"}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center h-full text-white">
                    <p className="font-semibold text-[14px]">Fiky Ganteng</p>
                    <p className="text-sm">
                      {new Date().toLocaleDateString("id-ID", {
                        weekday: "long",
                      })}
                      {", "}
                      {new Date().toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </aside>
  );
}
