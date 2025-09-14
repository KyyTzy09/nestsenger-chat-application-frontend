import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import { useGetProfile } from "../../hooks/profile-hook";
import type { UserType } from "shared/types/user-type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "shared/shadcn/dropdown-menu";
import { Separator } from "shared/shadcn/separator";
import { BellIcon, KeyRoundIcon, LaptopIcon, UserIcon } from "lucide-react";
import { FaComment } from "react-icons/fa";
import ProfileSection from "../sections/profile-section";

interface ProfileDropdownProps {
  user: UserType;
}

export default function ProfileDropDown({ user }: ProfileDropdownProps) {
  const dropDownItems = [
    {
      Icon: LaptopIcon,
      text: "Umum",
      onClickEvent: () => "general",
    },
    {
      Icon: KeyRoundIcon,
      text: "Akun",
      onClickEvent: () => "account",
    },
    {
      Icon: FaComment,
      text: "Chat",
      onClickEvent: () => "chat",
    },
    {
      Icon: BellIcon,
      text: "Notifikasi",
      onClickEvent: () => "notification",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`${location.pathname === "/setting" ? "bg-[#45494f]" : "bg-transparent"} flex items-center justify-center w-full hover:bg-[#45494f] rounded-sm p-2 focus-visible:ring-0`}
        >
          <img
            src={user?.Profile?.avatar || defaultImage}
            alt="default"
            className="w-8 h-8 object-cover rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex min-w-[600px] min-h-[30rem] bg-[#353535] text-white shadow shadow-black border-0 gap-2 translate-y-12 translate-x-2 p-0"
        side="top"
      >
        <section className="flex flex-col items-center justify-between w-[30%] min-h-full p-2 bg-[#282828]">
          <div className="flex flex-col items-center justify-start w-full">
            {dropDownItems.map(({ Icon, text, onClickEvent }, i) => {
              return (
                <Button
                  key={i}
                  className="flex items-center justify-start w-full h-10 bg-transparent hover:bg-[#353535] gap-3"
                  onClick={onClickEvent}
                >
                  <Icon className="w-5 h-5" />
                  <p className="font-normal">{text}</p>
                </Button>
              );
            })}
          </div>
          <div className="w-full">
            <Button
              className="flex items-center justify-start w-full h-10 bg-transparent hover:bg-[#353535] gap-3"
              onClick={() => {}}
            >
              <UserIcon className="w-5 h-5" />
              <p className="font-normal">Profil</p>
            </Button>
          </div>
        </section>
        <section className="w-[70%] py-4 p-2">
          <ProfileSection user={user} />
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
