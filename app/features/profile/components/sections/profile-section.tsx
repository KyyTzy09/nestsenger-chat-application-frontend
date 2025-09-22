import React from "react";
import { defaultImage } from "shared/constants/image-default";
import type { UserType } from "shared/types/user-type";
import AvatarDropDown from "../interaction/avatar-dropdown";
import { Button } from "shared/shadcn/button";
import { Separator } from "shared/shadcn/separator";
import ProfileForm from "../forms/profile-form";
import { useLogout } from "~/features/auth/hooks/auth-hook";
import AlertModal from "shared/components/modals/alert-modal";

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

  const { mutate: logout, isPending } = useLogout();
  const [showConfirm, setShowConfirm] = React.useState<boolean>(false);

  return (
    <>
      <AlertModal
        alertTitle="Konfirmasi Keluar"
        alertDesc="Anda yakin ingin logout?"
        onOpen={showConfirm}
        setOnOpen={setShowConfirm}
        onConfirm={() => logout()}
      />
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
        <Button
          disabled={isPending}
          onClick={() => setShowConfirm(true)}
          className="flex items-center justify-center w-28 bg-[#282828] hover:bg-gray-100/30 text-sm font-normal transition duration-500"
        >
          Keluar
        </Button>
      </main>
    </>
  );
}
