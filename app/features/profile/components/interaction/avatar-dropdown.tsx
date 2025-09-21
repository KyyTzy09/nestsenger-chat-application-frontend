import { EditIcon, EyeIcon, PencilIcon, Trash } from "lucide-react";
import React from "react";
import CropperDialog from "~/features/profile/components/cropper-dialog";
import ImageInput from "shared/components/uploads/image-input";
import { defaultImage } from "shared/constants/image-default";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "shared/shadcn/dropdown-menu";
import { useUpdateAvatarStore } from "shared/stores/avatar-store";

interface AvatarDropDownProps {
  image: string;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AvatarDropDown({
  image,
  setPreview,
}: AvatarDropDownProps) {
  // Selector state
  const setShowDialog = useUpdateAvatarStore((s) => s.setShowDialog);
  const setAvatar = useUpdateAvatarStore((s) => s.setAvatar);
  
  // Dropdownmenu state
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <PencilIcon className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="flex flex-col bg-[#252525] border-none"
          side="top"
        >
          <DropdownMenuItem
            disabled={image === defaultImage}
            onClick={() => {}}
            className="flex items-center justify-start gap-2 focus:bg-[#353535] rounded-sm"
          >
            <Trash className="text-white w-4 h-4" strokeWidth={1.5} />
            <p className="text-white font-normal">Hapus Gambar</p>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="opacity-30" />
          <DropdownMenuItem
            disabled={image === defaultImage}
            onClick={() => {
              setPreview(true);
            }}
            className="flex items-center justify-start gap-2 focus:bg-[#353535]"
          >
            <EyeIcon className="text-white w-4 h-4" strokeWidth={1.5} />
            <p className="text-white font-normal">Lihat Gambar</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            onClick={(e) => setIsOpen(false)}
            className="flex items-center justify-start gap-2 focus:bg-[#353535]"
          >
            <ImageInput
              setImage={setAvatar}
              onComplete={() => setShowDialog(true)}
              onClose={() => setIsOpen(false)}
              className="flex items-center justify-start gap-2 "
            >
              <EditIcon className="text-white w-4 h-4" strokeWidth={1.5} />
              <p className="text-white font-normal">Ubah Gambar</p>
            </ImageInput>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
