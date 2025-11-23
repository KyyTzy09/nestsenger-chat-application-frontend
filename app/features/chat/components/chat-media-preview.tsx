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
  // Refs
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const mediaRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  const { openPreview, setOpenPreview, chatId, resetState } =
    useMediaPreviewStore();

  const { roomId } = useParams<{ roomId: string }>() as { roomId: string };
  const { data: nonFileMediaResponse, isPending } = useGetNonFileMedia({
    roomId,
  });

  const handleScroll = (index: number) => {
    if (index >= 0 && mediaRefs.current[index]) {
      mediaRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  };

  React.useEffect(() => {
    if (mediaRefs.current) {
      const mediaIndex = mediaRefs.current.findIndex((m) => m?.id === chatId);
      if (mediaIndex >= 0 && mediaRefs.current[mediaIndex]) {
        mediaRefs.current[mediaIndex]?.scrollIntoView({
          behavior: "instant",
          inline: "center",
        });
      }
    }
  }, [openPreview, chatId]);

  React.useEffect(() => {
    if (!mediaRefs.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setSelectedIndex(index);
          }
        });
      },
      { threshold: 0.8 }
    );

    mediaRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [openPreview, setSelectedIndex]);

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
                resetState();
                setOpenPreview(false);
              }}
              className="flex items-center justify-center w-10 h-10 bg-transparent hover:bg-[#45494f] p-2"
            >
              <ArrowLeftIcon />
            </Button>
          </section>
          <section className="flex items-center justify-between w-full h-[85%] ">
            <Button
              disabled={selectedIndex === 0}
              onClick={() => {
                if (selectedIndex !== null && selectedIndex !== undefined) {
                  handleScroll(selectedIndex - 1);
                }
              }}
            >
              <ChevronLeftIcon />
            </Button>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory w-full h-full no-scrollbar"
            >
              {nonFileMediaResponse?.data.length! > 0 &&
                nonFileMediaResponse?.data.map(
                  ({ chatId, mediaUrl, mediaType }, i) => {
                    return (
                      <div
                        key={i}
                        data-index={i}
                        id={chatId}
                        className="w-full h-full flex items-center justify-center shrink-0 snap-center"
                        ref={(el) => {
                          if (mediaRefs.current) {
                            mediaRefs.current[i] = el;
                          }
                        }}
                      >
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
                      </div>
                    );
                  }
                )}
            </div>
            <Button
              disabled={
                selectedIndex ===
                (nonFileMediaResponse?.data.length as number) - 1
              }
              onClick={() => {
                if (selectedIndex !== null && selectedIndex !== undefined) {
                  handleScroll(selectedIndex + 1);
                }
              }}
            >
              <ChevronRightIcon />
            </Button>
          </section>
          <section className="flex flex-row items-center w-full max-h-[10%] py-1 gap-2 overflow-x-auto no-scrollbar">
            {nonFileMediaResponse?.data?.length! > 0 &&
              nonFileMediaResponse?.data?.map(
                ({ chatId, mediaName, mediaType, mediaUrl }, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedIndex(i);
                        handleScroll(i);
                      }}
                      className={`w-12 h-12 rounded-sm overflow-hidden ${selectedIndex === i ? "border-blue-500 border-3" : "border-1"}`}
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
