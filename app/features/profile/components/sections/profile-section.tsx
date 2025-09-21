import { LoaderIcon, PencilIcon } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import type { UserType } from "shared/types/user-type";
import AvatarDropDown from "../interaction/avatar-dropdown";
import { Input } from "shared/shadcn/input";
import { Button } from "shared/shadcn/button";
import { Label } from "shared/shadcn/label";
import { Separator } from "shared/shadcn/separator";
import { usePatchBio, usePatchName } from "../../hooks/profile-hook";
import { Textarea } from "shared/shadcn/textarea";
import PreviewImageModal from "shared/components/modals/preview-modal";
import CropperDialog from "~/features/profile/components/cropper-dialog";
import ProfileForm from "../forms/profile-form";

interface ProfileSectionProps {
  user: UserType;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileSection({
  user,
  setPreview,
}: ProfileSectionProps) {
  const {
    Profile: { avatar },
  } = user;
  return (
    <>
      <main className="flex flex-col w-full h-full gap-6">
        <section className="group relative flex items-center justify-start w-24 h-24">
          <img
            src={avatar || defaultImage}
            alt="foto profil"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute flex items-center justify-center w-full h-full rounded-full top-0 bottom-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500">
            <AvatarDropDown image={avatar} setPreview={setPreview} />
          </div>
        </section>
        <ProfileForm user={user} />
        <Separator className="opacity-50" />
        <Button className="flex items-center justify-center w-28 bg-[#282828] hover:bg-gray-100/30 text-sm font-normal transition duration-500">
          Keluar
        </Button>
      </main>
    </>
  );
}
