import { ImagesIcon, InfoIcon, UserIcon, UsersRoundIcon } from "lucide-react";
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

interface RoomInfoDropDownProps {
  info: {
    room: RoomType;
    alias: FriendType | UserType | null;
  };
  member: {
    member: MemberType;
    alias: FriendType | UserType | null;
  }[];
  currentUserId: string;
}

export default function RoomInfoDropdown({
  info,
  member,
  currentUserId,
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
  }, [setOpenedTab]);

  return (
    <aside className="absolute flex min-w-[480px] h-[30rem] z-10 text-white shadow-sm shadow-black left-0 top-[70px] rounded-lg overflow-hidden">
      <section className="flex flex-col items-center justify-between w-[30%] min-h-full p-2 bg-[#282828]/90">
        <div className="flex flex-col items-center justify-start w-full gap-2">
          {dropDownItems.map(({ Icon, text, tab, onClickEvent, enable }, i) => {
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
          })}
        </div>
      </section>
      <section className="w-[70%] h-full bg-[#303030] py-4 px-5 overflow-y-auto">
        {openedTab === "info" && <RoomInfoSection data={info} />}
        {openedTab === "member" && Array.isArray(member) && (
          <RoomMemberSection data={member} currentUserId={currentUserId} />
        )}
      </section>
    </aside>
  );
}
