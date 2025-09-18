import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import type { UserType } from "shared/types/user-type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "shared/shadcn/dropdown-menu";
import { BellIcon, KeyRoundIcon, LaptopIcon, UserIcon } from "lucide-react";
import { FaComment } from "react-icons/fa";
import ProfileSection from "../sections/profile-section";
import PreviewImageModal from "shared/components/modals/preview-modal";
import { AnimatePresence } from "motion/react";

interface ProfileDropdownProps {
  user: UserType;
}

export default function ProfileDropDown({ user }: ProfileDropdownProps) {
  const [openedTab, setOpenedTab] = React.useState<string>("profile");
  const [isPreview, setIsPreview] = React.useState<boolean>(false);

  const dropDownItems = [
    {
      Icon: LaptopIcon,
      text: "Umum",
      tab: "general",
      onClickEvent: () => setOpenedTab("general"),
    },
    {
      Icon: KeyRoundIcon,
      text: "Akun",
      tab: "account",
      onClickEvent: () => setOpenedTab("account"),
    },
    {
      Icon: FaComment,
      text: "Chat",
      tab: "chat",
      onClickEvent: () => setOpenedTab("chat"),
    },
    {
      Icon: BellIcon,
      text: "Notifikasi",
      tab: "notification",
      onClickEvent: () => setOpenedTab("notification"),
    },
  ];

  return (
    <>
      <AnimatePresence>
        {isPreview && (
          <PreviewImageModal
            image={user.Profile.avatar}
            setIsPreviewAction={setIsPreview}
            width={700}
            height={700}
            isOpen={isPreview}
          />
        )}
      </AnimatePresence>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={`${location.pathname === "/setting" ? "bg-[#45494f]" : "bg-transparent"} z-0 flex items-center justify-center w-full hover:bg-[#45494f] rounded-sm p-2 focus-visible:ring-0`}
          >
            <img
              src={user?.Profile?.avatar || defaultImage}
              alt="default"
              className="w-8 h-8 object-cover rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="flex min-w-[550px] min-h-[30rem] z-10 bg-[#353535] text-white shadow shadow-black border-0 translate-y-12 translate-x-2 p-0"
          side="top"
        >
          <section className="flex flex-col items-center justify-between w-[30%] min-h-full p-2 bg-[#282828]">
            <div className="flex flex-col items-center justify-start w-full gap-2">
              {dropDownItems.map(({ Icon, text, tab, onClickEvent }, i) => {
                return (
                  <Button
                    key={i}
                    className={`${tab === openedTab ? "bg-[#353535]" : "bg-transparent"} flex items-center justify-start w-full h-10 hover:bg-[#353535] gap-3`}
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
                className={`${openedTab === "profile" ? "bg-[#353535]" : "bg-transparent"} flex items-center justify-start w-full h-10 hover:bg-[#353535] gap-3`}
                onClick={() => setOpenedTab("profile")}
              >
                <UserIcon className="w-5 h-5" />
                <p className="font-normal">Profil</p>
              </Button>
            </div>
          </section>
          <section className="w-[70%] py-4 px-5">
            {openedTab === "profile" && (
              <ProfileSection user={user} setPreview={setIsPreview} />
            )}
          </section>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
