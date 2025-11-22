import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Music2Icon,
  MusicIcon,
  PlayIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Button } from "shared/shadcn/button";
import { useGetNonFileMedia } from "../hooks/chat-media-hook";
import { useParams } from "react-router";
import { useMediaPreviewStore } from "../stores/media-preview-store";

export default function ChatMediaPreview() {
  // Handle pagination
  const [page, setPage] = React.useState<number>(1);

  const { openPreview, setOpenPreview } = useMediaPreviewStore();
  const { roomId } = useParams<{ roomId: string }>() as { roomId: string };
  const { data: nonFileMediaResponse, isPending } = useGetNonFileMedia({
    roomId,
  });
  const limit = 1;

  const slicedMedia = nonFileMediaResponse?.data.slice(
    (page - 1) * limit,
    page * limit
  );

  const {
    mediaName: currentMediaName,
    mediaType,
    mediaUrl,
    chatId,
  } = slicedMedia && slicedMedia?.length! > 0 ? slicedMedia[0] : {};

  const maxPage = Math.ceil(nonFileMediaResponse?.data?.length! / limit);
  return (
    <AnimatePresence>
      {openPreview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className={`flex fixed flex-col w-full min-h-screen bg-[#232323]/80 z-50 top-0 bottom-0 left-0 right-0 backdrop-blur-md gap-1 px-3 py-2`}
        >
          <section className="flex items-center justify-between w-full">
            <Button
              onClick={() => {
                setOpenPreview(false);
              }}
              className="flex items-center justify-center w-10 h-10 bg-transparent hover:bg-[#45494f] p-2"
            >
              <ArrowLeftIcon />
            </Button>
          </section>
          <section className="flex items-center justify-between w-full h-[85%] ">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeftIcon />
            </Button>
            <React.Fragment key={chatId}>
              {mediaType === "image" ? (
                <img
                  src={mediaUrl}
                  alt="yaya"
                  className="w-auto h-auto max-h-full object-cover"
                />
              ) : mediaType === "video" ? (
                <video
                  className="w-auto h-auto max-h-full object-cover"
                  src={mediaUrl}
                  controls
                ></video>
              ) : mediaType === "audio" ? (
                <div className="flex flex-col items-center justify-center w-auto h-full min-w-[40%] p-2 gap-1">
                  <div className="flex items-center justify-center w-full h-[90%] bg-blue-500 rounded-t-md">
                    <Music2Icon className="w-32 h-32 text-white" />
                  </div>
                  <audio
                    src={mediaUrl}
                    className="w-full rounded-sm h-12"
                    controls
                  ></audio>
                </div>
              ) : null}
            </React.Fragment>
            <Button
              disabled={page === maxPage}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRightIcon />
            </Button>
          </section>
          <section className="flex flex-row items-center w-full max-h-[10%] py-1 gap-2 overflow-x-auto no-scrollbar">
            {nonFileMediaResponse?.data?.length! > 0 &&
              nonFileMediaResponse?.data?.map(
                ({ mediaName, mediaType, mediaUrl }, i) => {
                  return (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-sm overflow-hidden ${currentMediaName === mediaName ? "border-blue-500 border-3" : "border-1"}`}
                    >
                      {mediaType === "image" ? (
                        <img
                          className="w-full h-full object-cover"
                          src={mediaUrl}
                          alt={mediaName}
                        />
                      ) : mediaType === "video" ? (
                        <video
                          src={mediaUrl}
                          className="w-full h-full object-cover"
                        ></video>
                      ) : (
                        <div className="w-full h-full p-1">
                          <Music2Icon className="w-full h-full " />
                        </div>
                      )}
                    </div>
                  );
                }
              )}
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
