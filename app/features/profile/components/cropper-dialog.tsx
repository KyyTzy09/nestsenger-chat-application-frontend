import React from "react";
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "shared/shadcn/alert-dialog";
import ImageCropper from "../../../../shared/components/uploads/image-cropper";
import { usePatchAvatar } from "../hooks/profile-hook";
import { useUpdateAvatarStore } from "~/features/profile/stores/profile-store";

export default function AvatarCropper() {
  const avatar = useUpdateAvatarStore((s) => s.avatar);
  const showDialog = useUpdateAvatarStore((s) => s.showDialog);
  const setShowDialog = useUpdateAvatarStore((s) => s.setShowDialog);
  const setAvatar = useUpdateAvatarStore((s) => s.setAvatar);

  const [isCropped, setIsCropped] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<Blob | null>(null);
  const { mutate: onPatch, isPending } = usePatchAvatar(setFile, setShowDialog);

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTitle/>
      <AlertDialogContent className="w-[800px] bg-[#101010]/90 p-0 rounded-none md:rounded-none border-x-0 border-y">
        <ImageCropper
          image={avatar || null}
          isLoading={isPending}
          setimageUpload={setFile}
          onClose={() => {
            setAvatar(null);
            setShowDialog(false);
          }}
          onSuccess={() => {
            if (file) {
              onPatch(file);
            }
          }}
          isCrop={isCropped}
          setImage={setAvatar}
          setIsCrop={setIsCropped}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
