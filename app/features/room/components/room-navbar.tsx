import { AnimatePresence } from "motion/react";
import React from "react";
import PreviewImageModal from "shared/components/modals/preview-modal";
import { defaultImage } from "shared/constants/image-default";
import { RoomTypeEnum } from "shared/enums/room-type";
import { Label } from "shared/shadcn/label";
import type { FriendType } from "shared/types/friend-type";
import type { ChatMediaType } from "shared/types/media-type";
import type { MemberType } from "shared/types/member-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import RoomInfoDropdown from "~/features/room/components/interactions/room-dropdown";

interface RoomNavbarProps {
  roomInfo: {
    room: RoomType;
    alias: FriendType | UserType | null;
  };
  memberInfo: {
    member: MemberType;
    alias: FriendType | UserType | null;
  }[];
  media: ChatMediaType[];
  currentUserId: string;
}

export default function RoomNavbar({
  roomInfo,
  memberInfo,
  currentUserId,
  media,
}: RoomNavbarProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [showPreview, setShowPreview] = React.useState<boolean>(false);

  const previewImageUrl = (): string => {
    let result = "";
    if (roomInfo?.room?.type === RoomTypeEnum.GROUP) {
      result = roomInfo?.room?.avatar;
    } else {
      if (roomInfo?.alias && (roomInfo?.alias as FriendType)) {
        result =
          (roomInfo?.alias as FriendType)?.friend?.avatar ||
          (roomInfo?.alias as UserType)?.profile?.avatar;
      } else {
        result = defaultImage;
      }
    }
    return result;
  };

  React.useEffect(() => {
    if (defaultImage === previewImageUrl()) {
      setShowPreview(false);
    }
  }, [setShowPreview, previewImageUrl, isOpen]);

  return (
    <>
      <AnimatePresence>
        {showPreview && defaultImage !== previewImageUrl() && (
          <PreviewImageModal
            isOpen={showPreview}
            setIsPreviewAction={setShowPreview}
            image={previewImageUrl()}
            width={700}
            height={700}
          />
        )}
      </AnimatePresence>
      <RoomInfoDropdown
        open={isOpen}
        onOpenChange={setIsOpen}
        showImagePreviewChange={setShowPreview}
        info={roomInfo}
        member={memberInfo}
        media={media}
        currentUserId={currentUserId}
      />
      <nav className="flex items-center justify-between w-full h-[70px] bg-[#252525] border border-black p-5">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center justify-start w-full h-full max-w-[80%] gap-5"
        >
          <div className="w-10 h-10">
            <img
              src={
                roomInfo?.alias && roomInfo?.room?.type === RoomTypeEnum.PRIVATE
                  ? (roomInfo?.alias as UserType)?.profile?.avatar ||
                    (roomInfo?.alias as FriendType)?.friend?.avatar
                  : roomInfo?.room?.avatar || defaultImage
              }
              alt="yaya"
              className="w-full h-full rounded-full group-hover:opacity-75"
            />
          </div>
          <div className="flex flex-col items-start font-semibold text-white gap-1">
            <Label className="">
              {roomInfo?.room?.type === RoomTypeEnum.GROUP
                ? roomInfo?.room?.roomName
                : (roomInfo?.alias && (roomInfo?.alias as UserType)?.email) ||
                  (roomInfo?.alias as FriendType)?.alias}
            </Label>
            <Label className="text-[10px] text-gray-300 font-normal">
              Klik untuk info{" "}
              {roomInfo?.room?.type === RoomTypeEnum.GROUP ? "Grup" : "Kontak"}
            </Label>
          </div>
        </button>
      </nav>
    </>
  );
}
