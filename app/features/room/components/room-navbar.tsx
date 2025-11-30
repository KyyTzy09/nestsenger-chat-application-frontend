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
  media
}: RoomNavbarProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [showPreview, setShowPreview] = React.useState<boolean>(false);

  const {
    room: { roomName, type, avatar },
    alias,
  } = roomInfo;

  const previewImageUrl = (): string => {
    let result = "";
    if (type === RoomTypeEnum.GROUP) {
      result = avatar;
    } else {
      if (alias && (alias as FriendType)) {
        result =
          (alias as FriendType)?.friend?.avatar ||
          (alias as UserType)?.profile?.avatar;
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
                alias && type === RoomTypeEnum.PRIVATE
                  ? (alias as UserType)?.profile?.avatar ||
                    (alias as FriendType)?.friend?.avatar
                  : avatar || defaultImage
              }
              alt="yaya"
              className="w-full h-full rounded-full group-hover:opacity-75"
            />
          </div>
          <div className="flex flex-col items-start font-semibold text-white gap-1">
            <Label className="">
              {type === RoomTypeEnum.GROUP
                ? roomName
                : (alias && (alias as UserType)?.email) ||
                  (alias as FriendType)?.alias}
            </Label>
            <Label className="text-[10px] text-gray-300 font-normal">
              Klik untuk info {type === RoomTypeEnum.GROUP ? "Grup" : "Kontak"}
            </Label>
          </div>
        </button>
      </nav>
    </>
  );
}
