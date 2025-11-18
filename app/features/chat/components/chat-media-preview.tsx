import { ArrowLeftIcon, Music2Icon } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { Button } from "shared/shadcn/button";
import { useGetNonFileMedia } from "../hooks/chat-media-hook";
import { useParams } from "react-router";

export default function ChatMediaPreview() {
  const isOpen = false;
  const { roomId } = useParams<{ roomId: string }>() as { roomId: string };
  const { data: nonFileMediaResponse, isPending } = useGetNonFileMedia({
    roomId,
  });
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className={`${
        isOpen && roomId ? "flex" : "hidden"
      } fixed flex-col w-full min-h-screen bg-[#232323]/80 z-50 top-0 bottom-0 left-0 right-0 backdrop-blur-md gap-1 px-3 py-2`}
    >
      <section className="flex items-center justify-between w-full">
        <Button className="flex items-center justify-center w-10 h-10 bg-transparent hover:bg-[#45494f] p-2">
          <ArrowLeftIcon />
        </Button>
      </section>
      <section className="flex items-center justify-center w-full h-[85%] ">
        <div className="w-[30%] h-full bg-gray-500"></div>
      </section>
      <section className="flex flex-row items-center w-full max-h-[10%] py-1 gap-2 overflow-x-auto no-scrollbar">
        {nonFileMediaResponse?.data?.length! > 0 &&
          nonFileMediaResponse?.data?.map(
            ({ mediaName, mediaType, mediaUrl }, i) => {
              return (
                <div
                  key={i}
                  className="min-w-12 h-12 rounded-sm border-blue-500 border-3"
                >
                  {mediaType === "image" ? (
                    <img
                      className="w-full h-full object-cover"
                      src={mediaUrl}
                      alt={mediaName}
                    />
                  ) : mediaType === "video" ? (
                    <video src={mediaUrl} className="w-full h-full object-contain"></video>
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
  );
}
