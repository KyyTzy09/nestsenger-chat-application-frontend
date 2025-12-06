import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import {
  createGroupSchema,
  type createGroupType,
} from "shared/schemas/room-schema";
import { Button } from "shared/shadcn/button";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import { useCreateGroupRoom } from "../../hooks/room-hooks";
import { defaultImage } from "shared/constants/image-default";

interface AddGroupFormProps {
  userIds: string[];
  onClose: () => void;
}

export default function AddGroupForm({ userIds, onClose }: AddGroupFormProps) {
  // Form validation
  const [avatar, setAvatar] = React.useState<File | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: zodResolver(createGroupSchema) });
  const { mutate: createGroupMutation, isPending } = useCreateGroupRoom();

  const onSubmit = (data: createGroupType) => {
    if (avatar) createGroupMutation({ ...data, file: avatar, userIds });
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-between w-full h-full px-4 gap-4"
    >
      <section className="flex flex-col items-center w-full gap-4">
        <div className="flex items-center justify-start gap-2 w-full">
          <Label
            className={`flex items-center justify-center w-12 h-12 bg-[#202020] rounded-full ${avatar ? "p-0" : "p-3"}`}
          >
            {avatar ? (
              <img
                className="w-full h-full object-contain rounded-full"
                src={URL.createObjectURL(avatar) || defaultImage}
                alt="preview"
              />
            ) : (
              <CameraIcon className="w-full h-full" />
            )}
            <input
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAvatar(file);
              }}
              type="file"
              title="hidden"
              className="hidden w-full"
            />
          </Label>
          <Label className="text-gray-200">Tambah Ikon Grup</Label>
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-2">
          <Label>Berikan Nama Grup</Label>
          <Input
            {...register("roomName")}
            placeholder="Nama Grup"
            className="w-full h-8 bg-[#303030] ring-0 border-b-3 border-b-blue-500 focus-visible:ring-0 selection:bg-blue-400 focus-visible:border-b-blue-500 rounded"
          />
        </div>
      </section>
      <section className="flex items-center justify-center self-end-safe w-full h-8 gap-1">
        <Button
          className="flex items-center justify-center w-1/2 h-full bg-blue-500 hover:bg-blue-300"
        >
          Lanjut
        </Button>
        <Button type="button" onClick={onClose} className="flex items-center justify-center w-1/2 h-full bg-transparent h">
          Batal
        </Button>
      </section>
    </form>
  );
}
