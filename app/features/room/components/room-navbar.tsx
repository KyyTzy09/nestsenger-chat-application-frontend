import { CircleIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import React from "react";
import PreviewImageModal from "shared/components/modals/preview-modal";
import { defaultImage } from "shared/constants/image-default";
import { RoomTypeEnum } from "shared/enums/room-type";
import { Label } from "shared/shadcn/label";
import type { AliasType } from "shared/types/alias-type";
import type { FriendType } from "shared/types/friend-type";
import type { ChatMediaType } from "shared/types/media-type";
import type { MemberType } from "shared/types/member-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import RoomInfoDropdown from "~/features/room/components/interactions/room-dropdown";

interface RoomNavbarProps {
  roomInfo: {
    room: RoomType;
    user: AliasType | null;
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
      if (roomInfo?.user) {
        result = roomInfo?.user?.avatar;
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
                roomInfo?.user && roomInfo?.room?.type === RoomTypeEnum.PRIVATE
                  ? roomInfo?.user?.avatar
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
                : roomInfo?.user
                  ? roomInfo.user.alias
                    ? roomInfo.user.alias
                    : roomInfo.user.email
                  : ""}
            </Label>
            {roomInfo?.user && roomInfo?.user?.isOnline ? (
              <Label className="flex items-center justify-center text-[10px] text-gray-300 font-normal gap-1">
                <CircleIcon className="fill-blue-500 w-2 h-2 text-blue-500" />{" "}
                Online
              </Label>
            ) : (
              <Label className="text-[10px] text-gray-300 font-normal">
                Klik untuk info{" "}
                {roomInfo?.room?.type === RoomTypeEnum.GROUP
                  ? "Grup"
                  : "Kontak"}
              </Label>
            )}
          </div>
        </button>
      </nav>
    </>
  );
}
