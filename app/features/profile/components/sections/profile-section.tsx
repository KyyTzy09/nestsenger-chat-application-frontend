import { PencilIcon } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import type { UserType } from "shared/types/user-type";

interface ProfileSectionProps {
  user: UserType;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <main className="flex flex-col w-full h-full">
      <section className="group relative flex items-center justify-start w-24 h-24">
        <img
          src={user.Profile.avatar || defaultImage}
          alt="foto profil"
          className="w-full h-full rounded-full object-cover"
        />
        <div className="absolute flex items-center justify-center w-full h-full rounded-full top-0 bottom-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500">
          <PencilIcon />
        </div>
      </section>
      <section className="flex flex-col w-full"></section>
    </main>
  );
}
