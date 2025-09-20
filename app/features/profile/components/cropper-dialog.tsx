import React from "react";
import { Button } from "shared/shadcn/button";
import { CheckIcon, CropIcon, Icon, TrashIcon, XIcon } from "lucide-react";
import { useCropper } from "shared/contexts/cropper-context";
import { AlertDialog, AlertDialogContent } from "shared/shadcn/alert-dialog";
import Cropper, { type Area } from "react-easy-crop";
import { Dialog, DialogClose, DialogContent } from "shared/shadcn/dialog";
import ImageCropper from "../../../../shared/components/uploads/image-cropper";
import { defaultImage } from "shared/constants/image-default";

export default function CropperModal() {
  const cropper = useCropper();
  const [isCropped, setIsCropped] = React.useState<boolean>(false);

  return (
    <AlertDialog open={cropper?.isOpen}>
      <AlertDialogContent className="w-[800px] bg-[#101010]/90 p-0 rounded-none md:rounded-none border-x-0 border-y">
        <ImageCropper
          image={cropper?.image || ""}
          width={200}
          height={200}
          onClose={() => {
            cropper?.setImage("");
            cropper?.setIsOpen(false);
          }}
          onSuccess={() => {
            alert("Sukses update avatar");
            cropper?.setIsOpen(false);
          }}
          isCrop={isCropped}
          setImage={cropper?.setImage!}
          setIsCrop={setIsCropped}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
