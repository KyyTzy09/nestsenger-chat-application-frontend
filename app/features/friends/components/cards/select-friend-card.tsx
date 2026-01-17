import { MailIcon, TagIcon } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { Input } from "shared/shadcn/input";
import type { FriendType } from "shared/types/friend-type";

interface userCardProps {
  data: FriendType[];
  setConfirmedFriend: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectFriendCard({
  data,
  setConfirmedFriend,
}: userCardProps) {
  const [activeUserId, setActiveUserId] = React.useState<string>("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
    const isChecked: boolean = e.target.checked;
    if (isChecked) {
      setActiveUserId(userId);
      setTimeout(() => {
        setConfirmedFriend(userId);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-2">
      {data?.map(({ userId, alias, friend: { avatar, userName } }) => {
        return (
          <div
            key={userId}
            className={`${userId === activeUserId ? "bg-[#45494f]" : "bg-transparent"} flex items-center justify-start w-full h-[70px] rounded-sm p-2 gap-2 hover:bg-[#45494f]`}
          >
            <section className="w-[75px] h-full">
              <img
                src={avatar || defaultImage}
                alt="Default"
                className="w-full h-full rounded-full"
              />
            </section>
            <section className="flex flex-col items-center justify-start w-full h-full p-1">
              <div className="flex items-center justify-between w-full text-sm text-white font-semibold">
                <p>{alias}</p>
              </div>
              <div className="flex items-center justify-start w-full text-white">
                <p className="flex items-center justify-center gap-2 text-[12px]">
                  ~{userName}
                </p>
              </div>
            </section>
            <section>
              <Input
                checked={userId === activeUserId}
                onChange={(e) => handleChange(e, userId)}
                type="checkbox"
              />
            </section>
          </div>
        );
      })}
    </div>
  );
}
