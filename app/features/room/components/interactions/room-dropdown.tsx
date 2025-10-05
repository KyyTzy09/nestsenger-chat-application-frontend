import {
  ImagesIcon,
  InfoIcon,
  UserIcon,
  UsersRoundIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import type { FriendType } from "shared/types/friend-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import RoomInfoSection from "../section/room-info-section";
import { RoomTypeEnum } from "shared/enums/room-type";
import RoomMemberSection from "../section/room-member-section";
import type { MemberType } from "shared/types/member-type";
import { AnimatePresence, motion } from "motion/react";

interface RoomInfoDropDownProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  info: {
    room: RoomType;
    alias: FriendType | UserType | null;
  };
  member: {
    member: MemberType;
    alias: FriendType | UserType | null;
  }[];
  currentUserId: string;
  showImagePreviewChange : React.Dispatch<React.SetStateAction<boolean>>
}

export default function RoomInfoDropdown({
  open,
  onOpenChange,
  info,
  member,
  currentUserId,
  showImagePreviewChange
}: RoomInfoDropDownProps) {
  const [openedTab, setOpenedTab] = React.useState<"info" | "media" | "member">(
    "info"
  );

  const dropDownItems = [
    {
      enable: true,
      Icon: InfoIcon,
      text: "Info",
      tab: "info",
      onClickEvent: () => setOpenedTab("info"),
    },
    {
      enable: info.room.type === RoomTypeEnum.GROUP,
      Icon: UsersRoundIcon,
      text: "member",
      tab: "member",
      onClickEvent: () => setOpenedTab("member"),
    },
    {
      enable: true,
      Icon: ImagesIcon,
      text: "media",
      tab: "media",
      onClickEvent: () => setOpenedTab("media"),
    },
  ];

  React.useEffect(() => {
    setOpenedTab("info");
  }, [ open, onOpenChange,info, setOpenedTab]);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, translateY: -100 }}
          animate={{ opacity: 100, translateY: 0 }}
          exit={{ opacity: 0, translateY: -100 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="absolute flex min-w-[480px] h-[30rem] z-10 text-white shadow-sm shadow-black left-0 top-2 rounded-lg overflow-hidden"
        >
          <section className="flex flex-col items-center justify-between w-[30%] min-h-full p-2 bg-[#282828]/90">
            <div className="flex flex-col items-center justify-start w-full gap-2">
              {dropDownItems.map(
                ({ Icon, text, tab, onClickEvent, enable }, i) => {
                  return (
                    <>
                      {enable && (
                        <Button
                          key={i}
                          className={`${tab === openedTab ? "bg-[#353535]" : "bg-transparent"} flex items-center justify-start w-full h-10 hover:bg-[#353535] gap-3`}
                          onClick={onClickEvent}
                        >
                          <Icon className="w-5 h-5" />
                          <p className="font-normal">{text}</p>
                        </Button>
                      )}
                    </>
                  );
                }
              )}
            </div>
          </section>
          <section className="relative w-[70%] h-full bg-[#303030] py-4 px-5 overflow-y-auto">
            <Button
              onClick={() => onOpenChange(false)}
              className="absolute w-4 h-5 top-1 right-1 bg-transparent"
              title="close"
            >
              <XIcon className="w-full h-full" />
            </Button>
            {openedTab === "info" && <RoomInfoSection data={info} showImagePreviewChange={showImagePreviewChange} />}
            {openedTab === "member" && Array.isArray(member) && (
              <RoomMemberSection data={member} currentUserId={currentUserId} />
            )}
          </section>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
