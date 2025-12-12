import { PlusIcon } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import { useUserStore } from "~/features/user/stores/user-store";
import { useCreateStatusStore } from "../stores/create-status-store";
import { GetMediaType } from "~/features/chat/components/logic/media-type-logic";

export default function CreateStatusTrigger() {
  const { user } = useUserStore();
  const { setStatuses } = useCreateStatusStore();

  const handleMultipleMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const medias = [...e.target.files];
      const statusData = medias.map((file) => {
        return {
          file,
          fileUrl: URL.createObjectURL(file),
          fileType: GetMediaType(file.name),
        };
      });
      setStatuses(statusData as []);
    }
  };

  React.useEffect(() => {
    setStatuses(null);
  }, [setStatuses]);
  
  return (
    <Label
      htmlFor="uploader"
      className="flex items-center justify-start w-full h-16 gap-3 hover:bg-[#45494f] px-5 rounded-md"
    >
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full">
        <img
          src={user?.profile?.avatar || defaultImage}
          alt={defaultImage}
          className="w-full h-full object-cover rounded-full"
        />
        <Input
          onChange={handleMultipleMedia}
          id="uploader"
          className="hidden"
          type="file"
          accept="image/*,video/*"
          multiple
        />
        <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-500">
          <PlusIcon className="w-full h-full text-white" />
        </div>
      </div>
      <section className="flex flex-col items-start justify-center h-full text-white">
        <p className="font-semibold text-[14px]">Status Anda</p>
        <p className="text-sm">Tambahkan Status</p>
      </section>
    </Label>
  );
}
