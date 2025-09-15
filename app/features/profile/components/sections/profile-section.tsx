import { PencilIcon } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import type { UserType } from "shared/types/user-type";
import AvatarDropDown from "../interaction/avatar-dropdown";
import { Input } from "shared/shadcn/input";
import { Button } from "shared/shadcn/button";
import { Label } from "shared/shadcn/label";
import { Separator } from "shared/shadcn/separator";

interface ProfileSectionProps {
  user: UserType;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const {
    email,
    Profile: { userName, bio: info, avatar },
  } = user;

  // State input value
  const [name, setName] = React.useState<string>("");
  const [bio, setBio] = React.useState<string>("");

  // Reusable change handle
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void
  ) => {
    const value = e.target.value;
    setValue(value);
  };

  React.useEffect(() => {
    setName(userName);
    setBio(info);
  }, [setName, setBio]);

  return (
    <main className="flex flex-col w-full h-full gap-6">
      <section className="group relative flex items-center justify-start w-24 h-24">
        <img
          src={avatar || defaultImage}
          alt="foto profil"
          className="w-full h-full rounded-full object-cover"
        />
        <div className="absolute flex items-center justify-center w-full h-full rounded-full top-0 bottom-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500">
          <AvatarDropDown image={avatar}>
            <PencilIcon className="w-4 h-4" />
          </AvatarDropDown>
        </div>
      </section>
      <section className="relative flex flex-col w-full gap-2">
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center w-full gap-1">
            <Input
              value={name}
              onChange={(e) => onChangeHandler(e, setName)}
              className="md:text-[18px] w-full text-white text-xl border-x-0 border-t-0 border-b-0 focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:bg-gray-800 px-1"
            />
            <Button className="cursor-pointer w-8 h-8 bg-transparent hover:bg-[#282828]">
              <PencilIcon className="w-full h-full" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <Label
            htmlFor="username"
            className="text-sm text-gray-200 font-normal pl-1"
          >
            Info
          </Label>
          <div className="flex items-center w-full gap-1">
            <Input
              id="username"
              value={bio}
              onChange={(e) => onChangeHandler(e, setBio)}
              className=" w-full text-white md:text-[12px] border-x-0 border-t-0 border-b-0 focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:bg-gray-800 px-1"
            />
            <Button className="cursor-pointer w-8 h-8 bg-transparent hover:bg-[#282828]">
              <PencilIcon className="w-full h-full" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <Label
            htmlFor="email"
            className="text-sm text-gray-200 font-normal pl-1"
          >
            Email
          </Label>
          <div className="flex items-center w-full gap-1">
            <Input
              id="email"
              disabled
              value={email}
              className=" w-full text-white md:text-[12px] border-x-0 border-t-0 border-b-0 focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:bg-gray-800 disabled:opacity-100 shadow-none px-1"
            />
          </div>
        </div>
      </section>
      <Separator className="opacity-50" />
      <Button className="flex items-center justify-center w-28 bg-[#282828] hover:bg-gray-100/30 text-sm font-normal transition duration-500">
        Keluar
      </Button>
    </main>
  );
}
