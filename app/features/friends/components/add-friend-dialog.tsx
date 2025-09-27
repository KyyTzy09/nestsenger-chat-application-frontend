import React from "react";
import { Dialog, DialogContent, DialogTitle } from "shared/shadcn/dialog";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import { Separator } from "shared/shadcn/separator";
import UserCard from "~/features/user/components/cards/user-card";
import { useGetUser, useGetUserById } from "~/features/user/hooks/user-hook";
import PickFriendSection from "./sections/pick-friend-section";
import AddFriendForm from "./forms/add-friend-form";
import type { UserType } from "shared/types/user-type";

interface AddFriendDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddFriendDialog({
  isOpen,
  setIsOpen,
}: AddFriendDialogProps) {
  const [tab, setTab] = React.useState<"pick" | "form">("pick");
  const [selectedUser, setSelectedUser] = React.useState<string>("");

  const { data: userResponse } = useGetUser();
  const {
    data: selectedUserResponse,
    isPending: selectUserLoad,
  } = useGetUserById({ userId: selectedUser });
  React.useEffect(() => {
    setSelectedUser("");
  }, [isOpen, setSelectedUser]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col w-[90%] md:w-96 bg-[#252525] text-white rounded-sm p-4 overflow-hidden">
        <DialogTitle>Tambah Teman</DialogTitle>
        <Separator />
        <div className="flex w-full h-full max-h-[26rem]">
          {tab === "pick" && !selectedUserResponse?.data ? (
            <PickFriendSection
              data={userResponse?.data!}
              setSelectedUserId={setSelectedUser}
            />
          ) : (
            <AddFriendForm
              data={selectedUserResponse?.data as UserType}
              isLoading={selectUserLoad}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
