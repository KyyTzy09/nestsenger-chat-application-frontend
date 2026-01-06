import { LoaderIcon, PencilIcon } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import { Input } from "shared/shadcn/input";
import { Separator } from "shared/shadcn/separator";
import { Textarea } from "shared/shadcn/textarea";
import type { RoomType } from "shared/types/room-type";
import { useUpdateRoomDesc, useUpdateRoomName } from "../../hooks/room-hooks";
import type { AliasType } from "shared/types/alias-type";
import { useGetMemberRole } from "~/features/member/hooks/member-hook";
import { MemberRole } from "shared/enums/member-role";

interface GroupInfoFormProps {
  roomData: { room: RoomType; user: AliasType | null };
  showImagePreview: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GroupInfoForm({
  roomData,
  showImagePreview,
  showDeleteModal,
}: GroupInfoFormProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRefName = React.useRef<HTMLInputElement>(null);
  const inputRefDesc = React.useRef<HTMLTextAreaElement>(null);

  const {
    room: { roomId, avatar: roomAvatar, createdAt, roomName, description },
  } = roomData;
  const [showInput, setShowInput] = React.useState<"name" | "desc" | null>(
    null
  );

  // Check Role
  const { data: roleResponse } = useGetMemberRole(roomId);
  const isAdmin =
    roleResponse?.data && roleResponse.data?.role === MemberRole.ADMIN;

  // Form Handle
  const [name, setName] = React.useState<string>(roomName);
  const [desc, setDesc] = React.useState<string>(description || "");

  // Reusable change handle
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => {
    const value = e.target.value;
    setValue(value);
  };

  // Auto Focus
  React.useEffect(() => {
    if (showInput === "name" && inputRefName.current) {
      inputRefName.current.focus();
    } else if (showInput === "desc" && inputRefDesc.current) {
      inputRefDesc.current?.focus();
    }
  }, [showInput]);

  // Mutation
  const { mutate: updateNameMutation, isPending: updateNameLoading } =
    useUpdateRoomName(roomId, () => setShowInput(null));
  const { mutate: updateDescMutation, isPending: updateDescLoading } =
    useUpdateRoomDesc(roomId, () => setShowInput(null));

  // Wrapper handle click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setName(roomName);
        setDesc(description || "");
        setShowInput(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setName, setDesc, roomData]);

  return (
    <form className="flex flex-col justify-start w-full h-full gap-4">
      <header className="flex items-center justify-center w-full">
        <button
          type="button"
          onClick={() => showImagePreview(true)}
          className="flex w-24 h-24 items-center justify-center"
        >
          <img
            src={roomAvatar || defaultImage}
            alt="avatar"
            className="w-full h-full rounded-full"
          />
        </button>
      </header>
      <div
        ref={wrapperRef}
        className="flex flex-col items-center w-full gap-4 "
      >
        <div className="flex flex-col items-end justify-start w-full gap-2 px-5">
          <section className="flex items-center justify-center w-full text-white gap-2">
            {showInput && showInput === "name" ? (
              <Input
                ref={inputRefName}
                value={name}
                maxLength={25}
                onChange={(e) => onChangeHandler(e, setName)}
                className="md:text-[18px] w-auto text-white text-xl font-bold border-x-0 border-t-0 border-b-0 focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:bg-gray-800 px-1"
              />
            ) : (
              <p className="font-bold text-xl text-center">{roomName}</p>
            )}
            {showInput !== "name" && isAdmin && (
              <Button
                onClick={() => {
                  setShowInput("name");
                }}
                type="button"
                className="flex items-center justify-center w-7 h-7 bg-transparent hover:bg-[#202020] p-1"
              >
                <PencilIcon className="w-full h-full" />
              </Button>
            )}
          </section>
          {showInput == "name" && (
            <button
              onClick={() => updateNameMutation(name)}
              type="button"
              // disabled={patchNamePending}
              // onClick={() => onPatchName({ userName: name })}
              className="group flex items-center justify-center w-1/5 text-[13px] bg-blue-600 text-white p-1 px-4 rounded-sm hover:bg-blue-700"
            >
              {updateNameLoading ? (
                <LoaderIcon className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span className="flex group-hover:hidden">
                    {name.length}/25
                  </span>
                  <span className="hidden group-hover:block">Selesai</span>
                </>
              )}
            </button>
          )}
        </div>
        <Separator />
        <div className="flex flex-col w-full text-[14px] gap-2">
          <section className="flex flex-col items-start justify-center w-full">
            <p className="text-gray-300">Dibuat </p>
            <p className="text-white break-words">
              {new Date(createdAt).toLocaleString("id-ID", {
                dateStyle: "full",
              })}
            </p>
          </section>
          <section className="flex flex-col items-start justify-start w-full ">
            <p className="text-gray-300">Deskripsi :</p>
            <div className="flex flex-col items-end justify-end w-full gap-2">
              <div className="flex items-center justify-between w-full text-white gap-2">
                {showInput && isAdmin && showInput === "desc" ? (
                  <Textarea
                    ref={inputRefDesc}
                    id="bio"
                    value={desc}
                    maxLength={200}
                    onChange={(e) => onChangeHandler(e, setDesc)}
                    className={`w-full h-full min-h-[30px] resize-none text-white border-x-0 border-t-0 border-b-0 focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:bg-gray-800 px-1`}
                  />
                ) : (
                  <p className="text-white">{description}</p>
                )}
                {showInput !== "desc" && (
                  <Button
                    onClick={() => {
                      setShowInput("desc");
                    }}
                    type="button"
                    className="flex items-center justify-center w-7 h-7 bg-transparent hover:bg-[#202020] p-1"
                  >
                    <PencilIcon className="w-full h-full" />
                  </Button>
                )}
              </div>
              {showInput == "desc" && (
                <button
                  onClick={() => updateDescMutation(desc)}
                  type="button"
                  // disabled={patchNamePending}
                  // onClick={() => onPatchName({ userName: name })}
                  className="group flex items-center justify-center w-1/5 text-[13px] bg-blue-600 text-white p-1 px-4 rounded-sm hover:bg-blue-700"
                >
                  {updateDescLoading ? (
                    <LoaderIcon className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span className="flex group-hover:hidden">
                        {desc.length}/200
                      </span>
                      <span className="hidden group-hover:block">Selesai</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
      <Separator />
      <div className="flex self-end-safe w-full">
        <Button
          type="button"
          onClick={() => showDeleteModal(true)}
          className="bg-[#252525]"
        >
          Keluar dari grup
        </Button>
      </div>
    </form>
  );
}
