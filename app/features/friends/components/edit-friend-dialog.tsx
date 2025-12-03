import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, XIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { defaultImage } from "shared/constants/image-default";
import {
  updateFriendSchema,
  type updateFriendType,
} from "shared/schemas/friend-schema";
import { Button } from "shared/shadcn/button";
import { Dialog, DialogContent, DialogTitle } from "shared/shadcn/dialog";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import type { AliasType } from "shared/types/alias-type";
import type { FriendType } from "shared/types/friend-type";
import type { UserType } from "shared/types/user-type";
import { useUpdateFriendAlias } from "../hooks/friend-hook";

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
  const { mutate: updateAlias, isPending } = useUpdateFriendAlias();
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      alias: data ? (data as FriendType)?.alias : "",
    },
    resolver: zodResolver(updateFriendSchema),
  });

  const onSubmit = (state: updateFriendType) => {
    updateAlias({
      alias: state?.alias,
      friendId: data
        ? (data as FriendType)?.friendId || (data as UserType)?.userId
        : "",
    });
  };

  React.useEffect(() => {
    resetField("alias");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col w-[300px] h-auto p-3 gap-5 text-white bg-[#252525]">
        <DialogTitle>Perbarui Teman</DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full h-full gap-2"
        >
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
            <Label htmlFor="alias">Simpan Sebagai</Label>
            <Input
              {...register("alias")}
              id="alias"
              className="flex w-full h-10 p-2"
            />
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
            {errors.alias && (
              <p className="flex items-center justify-center bg-black/20 text-red-500 text-[12px] rounded-sm backdrop-blur">
                {errors.alias.message}
              </p>
            )}
          </div>
          <div className="flex items-center w-full mt-5">
            <Button
              className="flex items-center justify-center w-full"
              type="submit"
            >
              {isPending ? (
                <LoaderIcon className="w-5 h-5 animate-spin" />
              ) : (
                "Simpan"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
