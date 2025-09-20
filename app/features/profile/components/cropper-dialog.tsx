import React from "react";
import { Button } from "shared/shadcn/button";
import { CheckIcon, CropIcon, Icon, TrashIcon, XIcon } from "lucide-react";
import { useCropper } from "shared/contexts/cropper-context";
import { AlertDialog, AlertDialogContent } from "shared/shadcn/alert-dialog";
import Cropper, { type Area } from "react-easy-crop";
import { Dialog, DialogClose, DialogContent } from "shared/shadcn/dialog";
import ImageCropper from "../../../../shared/components/uploads/image-cropper";
import { defaultImage } from "shared/constants/image-default";
import { usePatchAvatar } from "../hooks/profile-hook";

export default function AvatarCropper() {
  const cropper = useCropper();
  const [isCropped, setIsCropped] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<Blob | null>(null);
  const { mutate: onPatch, isPending } = usePatchAvatar(
    file,
    setFile,
    cropper?.setIsOpen!
  );

  return (
    <AlertDialog open={cropper?.isOpen}>
      <AlertDialogContent className="w-[800px] bg-[#101010]/90 p-0 rounded-none md:rounded-none border-x-0 border-y">
        <ImageCropper
          image={cropper?.image || ""}
          isLoading={isPending}
          width={200}
          height={200}
          setimageUpload={setFile}
          onClose={() => {
            cropper?.setImage("");
            cropper?.setIsOpen(false);
          }}
          onSuccess={() => {
            if (file) {
              onPatch();
            }
          }}
          isCrop={isCropped}
          setImage={cropper?.setImage!}
          setIsCrop={setIsCropped}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
