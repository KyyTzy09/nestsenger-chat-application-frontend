import { ArrowLeftIcon, XCircleIcon } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import type { FriendType } from "shared/types/friend-type";
import AddGroupForm from "../form/add-group-form";

interface AddGroupSectionProps {
  friends: FriendType[];
  onClose: () => void;
}

export default function AddGroupSection({
  friends,
  onClose,
}: AddGroupSectionProps) {
  const [tab, setTab] = React.useState<"selector" | "form">("selector");
  // Handle Select
  const [search, setSearch] = React.useState<string>("");
  const [selectedUsers, setSelectedUsers] = React.useState<
    { userId: string; alias: string; avatar: string }[] | []
  >([]);

  const filteredFriends = friends?.filter(({ alias }) => {
    return alias.toLowerCase().includes(search.toLowerCase());
  });

  const isSelectedUserId = (userId: string) => {
    return selectedUsers.some(({ userId: selectedUserId }) => {
      return userId === selectedUserId;
    });
  };

  const handleSelectUsers = (userId: string, alias: string, avatar: string) => {
    setSelectedUsers((prev) => {
      if (isSelectedUserId(userId)) {
        return prev.filter((u) => u.userId !== userId);
      }

      return [...prev, { userId, alias, avatar }];
    });
  };

  return (
    <section className="flex flex-col w-full h-full gap-3 text-white">
      <div className="flex items-center justify-start w-full gap-3">
        <Button onClick={onClose} className="w-10 h-10 bg-transparent">
          <ArrowLeftIcon />
        </Button>
        <Label className="text-white font-semibold text-lg">Grup Baru</Label>
      </div>
      <div className="flex flex-col items-center justify-center w-full px-3 gap-2">
        {selectedUsers?.length > 0 && (
          <div className="grid grid-cols-3 w-full max-h-20 gap-2 overflow-y-scroll custom-scroll border border-blue-500 p-1 rounded">
            {selectedUsers?.map(({ userId, alias, avatar }) => {
              return (
                <div
                  key={userId}
                  className="flex items-center justify-start w-full h-8 line-clamp-1 bg-blue-500 px-1 rounded gap-1"
                >
                  <img
                    src={avatar || defaultImage}
                    alt={defaultImage}
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="text-[12px] max-w-[80%] line-clamp-1">
                    {alias}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        {tab !== "form" && selectedUsers?.length > 0 && (
          <div className="flex items-center justify-center w-full h-8 gap-1">
            <Button
              onClick={() => setTab("form")}
              className="flex items-center justify-center w-1/2 h-full bg-blue-500 hover:bg-blue-300"
            >
              Lanjut
            </Button>
            <Button
              onClick={onClose}
              className="flex items-center justify-center w-1/2 h-full bg-transparent h"
            >
              Batal
            </Button>
          </div>
        )}
        {tab !== "form" && (
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari"
            className="flex w-full p-2 h-8 text-white border-b-2 border-b-blue-500 selection:bg-blue-400 focus-visible:outline-none focus-visible:ring-0 rounded"
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-start w-full h-full overflow-y-scroll custom-scrollbar gap-1">
        {tab === "selector" &&
          filteredFriends?.map(
            ({ id, alias, friend: { userId: friendId, avatar, bio } }, i) => {
              return (
                <Label
                  htmlFor={`cb-${i}`}
                  key={id}
                  className={`flex items-center justify-between w-full h-full max-h-[60px] rounded-sm p-2 gap-2 hover:bg-[#45494f]`}
                >
                  <section className="w-[55px] h-full">
                    <img
                      src={avatar || defaultImage}
                      alt="Default"
                      className="w-full h-full rounded-full"
                    />
                  </section>
                  <section className="flex flex-col items-center justify-start w-[90%] h-full p-1">
                    <div className="flex flex-col items-start justify-start w-full text-sm text-white">
                      <p className="text-start line-clamp-1">{alias}</p>
                    </div>
                  </section>
                  <Input
                    id={`cb-${i}`}
                    checked={isSelectedUserId(friendId)}
                    onChange={() => handleSelectUsers(friendId, alias, avatar)}
                    type="checkbox"
                    className="w-5 h-5"
                  />
                </Label>
              );
            }
          )}
        {tab === "form" && <AddGroupForm />}
      </div>
    </section>
  );
}
