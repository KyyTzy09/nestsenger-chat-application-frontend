import { EditIcon, PencilIcon } from "lucide-react";
import React from "react";
import AlertModal from "shared/components/modals/alert-modal";
import { defaultImage } from "shared/constants/image-default";
import { RoomTypeEnum } from "shared/enums/room-type";
import { Button } from "shared/shadcn/button";
import { Separator } from "shared/shadcn/separator";
import type { FriendType } from "shared/types/friend-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import { useOutGroup } from "../../hooks/room-hooks";
import EditFriendDialog from "~/features/friends/components/edit-friend-dialog";
import GroupInfoForm from "../form/group-info-form";

interface RoomInfoSectionProps {
  data: {
    room: RoomType;
    alias: FriendType | UserType | null;
  };
  showImagePreviewChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RoomInfoSection({
  data,
  showImagePreviewChange,
}: RoomInfoSectionProps) {
  const {
    room: { roomId, type: roomType, avatar: roomAvatar, createdAt, roomName },
    alias,
  } = data;

  // Out group handle
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [editAlias, setEditAlias] = React.useState<boolean>(false);
  const { mutate: outGroupMutate, isPending: onOutGroupLoad } = useOutGroup();
  return (
    <>
      <AlertModal
        alertTitle="Yakin ingin keluar dari grup?"
        alertDesc="konfirmasi keluar dari grup"
        onOpen={showModal}
        setOnOpen={setShowModal}
        onConfirm={() => outGroupMutate({ roomId: roomId })}
      />
      <EditFriendDialog
        isOpen={editAlias}
        setIsOpen={setEditAlias}
        data={data?.alias}
      />
      <section className="relative flex flex-col justify-start w-full h-full gap-4">
        {roomType === RoomTypeEnum.PRIVATE ? (
          // Private
          <>
            <Button
              onClick={() => setEditAlias(true)}
              className="absolute flex items-center justify-center w-8 h-8 p-2 bg-transparent hover:bg-[#202020] top-0 right-0 duration-700 transition"
            >
              <PencilIcon />
            </Button>
            <button
              onClick={() => showImagePreviewChange(true)}
              className="flex w-full items-center justify-center"
            >
              <img
                src={
                  alias
                    ? (alias as UserType)?.profile?.avatar ||
                      (alias as FriendType)?.friend?.avatar
                    : defaultImage
                }
                alt="profil"
                className="w-24 h-24 rounded-full"
              />
            </button>
            <div className="flex flex-col items-center justify-center w-full text-white">
              <p className="font-bold text-xl text-center">
                {alias
                  ? (alias as UserType)?.email || (alias as FriendType)?.alias
                  : ""}
              </p>
              <p className="text-sm text-center font-sans">
                ~
                {alias
                  ? (alias as UserType)?.profile?.userName ||
                    (alias as FriendType)?.friend?.userName
                  : ""}
              </p>
            </div>
            <Separator />
            <div className="flex flex-col w-full text-[14px] gap-2">
              <div className="flex flex-col items-start justify-center w-full">
                <p className="text-gray-300">Info :</p>
                <p className="text-white break-words">
                  {alias
                    ? (alias as UserType)?.profile?.bio ||
                      (alias as FriendType)?.friend?.bio
                    : ""}
                </p>
              </div>
              <div className="flex flex-col items-start justify-center w-full">
                <p className="text-gray-300">Email :</p>
                <p className="text-white">
                  {alias
                    ? (alias as UserType)?.email ||
                      (alias as FriendType)?.friend?.user?.email
                    : ""}
                </p>
              </div>
            </div>
          </>
        ) : (
          // Group
          <GroupInfoForm
            roomData={data}
            showDeleteModal={setShowModal}
            showImagePreview={showImagePreviewChange}
          />
        )}
      </section>
    </>
  );
}
