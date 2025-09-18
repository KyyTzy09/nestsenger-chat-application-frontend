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

interface ProfileSectionProps {
  user: UserType;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileSection({ user, setPreview }: ProfileSectionProps) {
  const {
    email,
    Profile: { userName, bio: info, avatar },
  } = user;

  // FocusHandler
  const [isActive, setIsActive] = React.useState<"name" | "bio" | "">("");
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRefName = React.useRef<HTMLInputElement>(null);
  const inputRefBio = React.useRef<HTMLTextAreaElement>(null);

  // mutationHandler
  const { mutate: onPatchName, isPending: patchNamePending } =
    usePatchName(setIsActive);
  const { mutate: onPatchBio, isPending: patchBioPending } =
    usePatchBio(setIsActive);

  // State input value
  const [name, setName] = React.useState<string>("");
  const [bio, setBio] = React.useState<string>("");

  // Reusable change handle
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => {
    const value = e.target.value;
    setValue(value);
  };

  // Initial data
  React.useEffect(() => {
    setName(userName);
    setBio(info);
  }, [setName, setBio]);

  // Auto Focus
  React.useEffect(() => {
    if (isActive === "name" && inputRefName.current) {
      inputRefName.current.focus();
    } else if (isActive === "bio" && inputRefBio.current) {
      inputRefBio.current?.focus();
    }
  }, [isActive]);

  // Wrapper handle click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setName(userName);
        setBio(info);
        setIsActive("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setName, setBio, user]);

  return (
    <main className="flex flex-col w-full h-full gap-6">
      <section className="group relative flex items-center justify-start w-24 h-24">
        <img
          src={avatar || defaultImage}
          alt="foto profil"
          className="w-full h-full rounded-full object-cover"
        />
        <div className="absolute flex items-center justify-center w-full h-full rounded-full top-0 bottom-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500">
          <AvatarDropDown image={avatar} setPreview={setPreview}>
            <PencilIcon className="w-4 h-4" />
          </AvatarDropDown>
        </div>
      </section>
      <section ref={wrapperRef} className="relative flex flex-col w-full gap-2">
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col w-full items-end justify-end gap-1">
            <div className="flex items-center w-full gap-1">
              <Input
                ref={inputRefName}
                value={name}
                maxLength={25}
                readOnly={isActive !== "name"}
                onChange={(e) => onChangeHandler(e, setName)}
                className="md:text-[18px] w-full text-white text-xl border-x-0 border-t-0 border-b-0 focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:bg-gray-800 px-1"
              />
              {isActive !== "name" && (
                <Button
                  onClick={() => setIsActive("name")}
                  className="cursor-pointer w-8 h-8 bg-transparent hover:bg-[#282828]"
                >
                  <PencilIcon className="w-full h-full" />
                </Button>
              )}
            </div>
            {isActive == "name" && (
              <button
                disabled={patchNamePending}
                onClick={() => onPatchName({ userName: name })}
                className="group flex items-center justify-center w-1/5 text-[13px] bg-blue-600 text-white p-1 px-4 rounded-sm hover:bg-blue-700"
              >
                {patchNamePending ? (
                  <LoaderIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span className="flex group-hover:hidden">
                      {name.length}/25
                    </span>
                    <span className="hidden group-hover:flex">Selesai</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <Label
            htmlFor="username"
            className="text-sm text-gray-200 font-normal pl-1"
          >
            Info
          </Label>
          <div className="flex flex-col w-full items-end justify-end gap-1">
            <div className="flex items-center w-full gap-1">
              <Textarea
                ref={inputRefBio}
                id="bio"
                value={bio}
                maxLength={200}
                readOnly={isActive !== "bio"}
                onChange={(e) => onChangeHandler(e, setBio)}
                className={`w-full h-full min-h-[60px] resize-none text-white md:text-[12px] border-x-0 border-t-0 border-b-0 focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:bg-gray-800 px-1`}
              />
              {isActive !== "bio" && (
                <Button
                  onClick={() => setIsActive("bio")}
                  className="cursor-pointer w-8 h-8 bg-transparent hover:bg-[#282828]"
                >
                  <PencilIcon className="w-full h-full" />
                </Button>
              )}
            </div>
            {isActive == "bio" && (
              <button
                disabled={patchBioPending}
                onClick={() => onPatchBio({ bio })}
                className="group flex items-center justify-center w-1/5 text-[13px] bg-blue-600 text-white p-1 px-4 rounded-sm hover:bg-blue-700"
              >
                {patchBioPending ? (
                  <LoaderIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span className="flex group-hover:hidden">
                      {bio.length}/200
                    </span>
                    <span className="hidden group-hover:flex">Selesai</span>
                  </>
                )}
              </button>
            )}
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
