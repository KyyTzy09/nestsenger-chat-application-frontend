import { XIcon } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import { Dialog, DialogContent, DialogTitle } from "shared/shadcn/dialog";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import type { AliasType } from "shared/types/alias-type";
import type { FriendType } from "shared/types/friend-type";
import type { UserType } from "shared/types/user-type";

interface EditFriendDialogProps {
  data: FriendType | UserType | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditFriendDialog({
  data,
  isOpen,
  setIsOpen,
}: EditFriendDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col w-[300px] h-auto p-3 gap-5">
        <DialogTitle>Perbarui Teman</DialogTitle>
        <form className="flex flex-col w-full h-full gap-2">
          <div className="flex items-center justify-center w-full">
            <img
              className="flex w-24 h-24 object-cover rounded-full"
              src={
                data
                  ? (data as UserType)?.profile?.avatar ||
                    (data as FriendType)?.friend?.avatar
                  : defaultImage
              }
              alt="profile"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="alias">Sebagai</Label>
            <Input id="alias" className="flex w-full h-10 p-2" />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled
              value={
                data
                  ? (data as UserType)?.email ||
                    (data as FriendType)?.friend?.user?.email
                  : ""
              }
              id="email"
              className="flex w-full h-10 p-2"
            />
          </div>
          <div className="flex items-center w-full mt-5">
            <Button
              className="flex items-center justify-center w-full"
              type="submit"
            >
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
