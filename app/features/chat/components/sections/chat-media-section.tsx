import { DownloadIcon, FileIcon, MusicIcon, PlayIcon } from "lucide-react";
import { Separator } from "shared/shadcn/separator";
import type { ChatMediaType } from "shared/types/media-type";

interface ChatMediaSectionProps {
  data: ChatMediaType;
}

export default function ChatMediaSection({
  data: { mediaUrl, mediaName, size, mediaType },
}: ChatMediaSectionProps) {
  return (
    <section className="w-full max-h-[400px] rounded-sm overflow-hidden bg-gray-500/40">
      {mediaType === "image" ? (
        <img src={mediaUrl} alt="yaya" className="w-full h-auto object-cover" />
      ) : mediaType === "video" ? (
        <div className="relative w-full h-auto">
          <video className="w-full h-auto object-cover" src={mediaUrl}></video>
          <div className="absolute flex items-center justify-center w-full h-full z-10 top-0">
            <PlayIcon
              strokeWidth={1}
              className="w-10 h-10 bg-black/75 rounded-md p-2"
            />
          </div>
        </div>
      ) : mediaType === "audio" ? (
        <div className="flex w-full p-2 gap-1">
          <div className="relative flex items-center justify-center w-10 h-10 p-2 bg-blue-600 rounded-full">
            <MusicIcon className="text-white" />
            <p className="absolute text-[8px] bottom-0 right-0">
              {mediaName.split(".")[1]}
            </p>
          </div>
          <audio
            src={mediaUrl}
            className="w-full rounded-sm h-10"
            controls
          ></audio>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full gap-1">
          <div className="flex items-center justify-start w-full h-12 gap-1">
            <section className="w-12 h-full p-2">
              <FileIcon className="w-full h-full" />
            </section>
            <section className="max-w-[60%] h-full text-[13px] py-1">
              <p className="truncate text-sm">{mediaName}</p>
              <div className="flex items-center justify-start w-full">
                <p className="text-gray-300">{size}</p>
              </div>
            </section>
          </div>
          <Separator />
          <div className="flex items-center justify-start w-full h-auto p-2">
            <a
              href={mediaUrl}
              download
              className="flex items-center justify-center bg-black/40 px-3 p-2 text-sm rounded-sm gap-1"
            >
              <DownloadIcon className="w-5 h-4" />
              Unduh File
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
