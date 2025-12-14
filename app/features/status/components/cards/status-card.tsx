import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { generateDateText2 } from "shared/helpers/generate-date";
import type { StatusType, StatusViewer } from "shared/types/status-type";
import StatusRing from "../section/status-ring";
import { PlusIcon } from "lucide-react";
import { Label } from "shared/shadcn/label";
import { Input } from "shared/shadcn/input";
import { GetMediaType } from "~/features/chat/components/logic/media-type-logic";
import { useCreateStatusStore } from "../../stores/create-status-store";

interface StatusCardProps {
  userName: string;
  imageUrl: string;
  statuses: StatusType[];
  viewers: StatusViewer[];
  createdDate: Date;
  showTrigger: boolean;
  action: () => void;
}

export default function StatusCard({
  userName,
  imageUrl,
  createdDate,
  showTrigger,
  statuses,
  viewers,
  action,
}: StatusCardProps) {
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
    <main
      onClick={action}
      className="flex items-center justify-start w-full h-16 gap-3 hover:bg-[#45494f] px-5 rounded-md z-10"
    >
      <StatusRing
        statuses={statuses}
        viewers={viewers}
        className="relative flex items-center justify-center w-14 h-14 rounded-full"
      >
        <img
          src={imageUrl || defaultImage}
          alt={defaultImage}
          className="w-full h-full object-cover rounded-full"
        />
        {showTrigger && (
          <Label
            onClick={(e) => e.stopPropagation()}
            htmlFor="uploader"
            className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-500 z-20"
          >
            <PlusIcon className="w-full h-full text-white" />
            <Input
              onChange={handleMultipleMedia}
              id="uploader"
              className="hidden"
              type="file"
              accept="image/*,video/*"
              multiple
            />
          </Label>
        )}
      </StatusRing>
      <section className="flex flex-col items-start justify-center h-full text-white">
        <p className="font-semibold text-[14px]">{userName}</p>
        {createdDate && (
          <p className="text-sm">
            {generateDateText2({ date: new Date(createdDate) })}
            {", "}
            {new Date(createdDate).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </section>
    </main>
  );
}
