import { Loader2Icon, SearchIcon } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import type { FriendType } from "shared/types/friend-type";
import { useAddGroupMembers } from "../hooks/member-hook";
import { useParams } from "react-router";
import AlertModal from "shared/components/modals/alert-modal";

interface PickMemberSectionProps {
  data: { user: FriendType; isJoined: boolean }[];
}

export default function PickMemberSection({ data }: PickMemberSectionProps) {
  const roomId = useParams<{ roomId: string }>().roomId;
  const [search, setSearch] = React.useState<string>("");
  const [filteredFriends, setFilteredFriends] =
    React.useState<{ user: FriendType; isJoined: boolean }[]>();
  const [selectedUsers, setSelectedUsers] = React.useState<
    { userId: string; alias: string; avatar: string }[] | []
  >([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const { mutate: addMemberMutation, isPending: isLoading } =
    useAddGroupMembers(roomId || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

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

  const handleAddMembers = () => {
    addMemberMutation(selectedUsers as []);
  };

  // Search Friend
  React.useEffect(() => {
    const keyword = search.toLowerCase();
    const filtered = data?.filter(({ user: { alias } }) => {
      return alias?.toLowerCase().includes(keyword);
    });
    setFilteredFriends(filtered);
  }, [search, data]);

  // initial data
  React.useEffect(() => {
    setFilteredFriends(data);
  }, [data, setSearch, setFilteredFriends]);

  return (
    <>
      <AlertModal
        alertTitle="Batalkan perubahan"
        alertDesc="Yakin ingin membatalkan?"
        onOpen={showModal}
        setOnOpen={setShowModal}
        onConfirm={() => {
          setSelectedUsers([]);
          setShowModal(false);
        }}
      />{" "}
      <section className="flex flex-col justify-between w-full h-full gap-5 ">
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
        </div>
        <div className="flex flex-col w-full h-full gap-5">
          <div className="relative flex w-full h-8">
            <Input
              value={search}
              onChange={handleChange}
              className="flex w-full bg-[#404040] border-blue-600 border-b-2 border-t-0 border-x-0 pl-8"
              placeholder="Cari seseorang yang ingin anda tambahkan"
            />
            <div className="absolute top-0 left-0 flex items-center justify-center w-6 h-full pl-2">
              <SearchIcon className="w-4 h-full" />
            </div>
          </div>
          <p className="flex items-start justify-start w-full text-sm">
            Ditemukan ( {filteredFriends?.length || 0} )
          </p>
          <div className="flex flex-col items-center justify-start w-full h-full overflow-y-scroll custom-scrollbar gap-1">
            {filteredFriends?.map(
              (
                {
                  user: {
                    id,
                    alias,
                    friend: { userId: friendId, avatar, bio },
                  },
                  isJoined,
                },
                i
              ) => {
                return (
                  <Label
                    htmlFor={`cb-${i}`}
                    key={id}
                    className={`flex items-center justify-between w-full h-full max-h-[60px] rounded-sm p-2 gap-2 ${isJoined ? "bg-[#45494f]" : "bg-transparent"} hover:bg-[#45494f]`}
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
                        <p className="text-start line-clamp-1 font-normal text-[12px]">
                          {!isJoined ? (
                            bio
                          ) : (
                            <span className="italic text-gray-400">
                              Sudah ditambahkan ke grup
                            </span>
                          )}
                        </p>
                      </div>
                    </section>
                    <Input
                      id={`cb-${i}`}
                      checked={isJoined || isSelectedUserId(friendId)}
                      onChange={() => {
                        if (!isJoined)
                          handleSelectUsers(friendId, alias, avatar);
                      }}
                      type="checkbox"
                      className="w-5 h-5"
                    />
                  </Label>
                );
              }
            )}
          </div>
        </div>
        {selectedUsers?.length > 0 && (
          <div className="self-end flex items-center justify-center w-full h-8 gap-1">
            <Button
              disabled={isLoading || selectedUsers.length === 0}
              onClick={handleAddMembers}
              className="flex items-center justify-center w-1/2 h-full bg-blue-500 hover:bg-blue-300"
            >
              {isLoading ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : (
                "Tambahkan"
              )}
            </Button>
            <Button
              onClick={handleDelete}
              className="flex items-center justify-center w-1/2 h-full bg-transparent h"
            >
              Batal
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
