import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Music2Icon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Button } from "shared/shadcn/button";
import { useUserStore } from "~/features/user/stores/user-store";
import { Label } from "shared/shadcn/label";
import { generateDateText2 } from "shared/helpers/generate-date";
import { defaultImage } from "shared/constants/image-default";
import { useStatusPreviewStore } from "../stores/status-store";

export default function StatusPreview() {
  // Refs
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const statusRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // State
  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  const { user } = useUserStore();
  const { data, statusId, openPreview, resetState } = useStatusPreviewStore();

  // Handler
  const handleShowMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleScroll = (index: number) => {
    if (index >= 0 && statusRefs.current[index]) {
      statusRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  };

  // Initial Scroll Handle
  React.useEffect(() => {
    if (statusRefs.current) {
      const mediaIndex = statusRefs.current.findIndex(
        (m) => m?.id === statusId
      );
      if (mediaIndex >= 0 && statusRefs.current[mediaIndex]) {
        statusRefs.current[mediaIndex]?.scrollIntoView({
          behavior: "instant",
          inline: "center",
        });
      }
    }
  }, []);

  //   Get Media Index
  React.useEffect(() => {
    if (!statusRefs.current) return;
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

    statusRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [openPreview, setSelectedIndex]);

  return (
    <AnimatePresence>
      {openPreview && data && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className={`flex fixed flex-col w-full min-h-screen bg-[#232323]/80 z-50 top-0 bottom-0 left-0 right-0 backdrop-blur-md gap-1 px-3 py-2`}
        >
          {/* Header */}
          <section className="flex items-center justify-between w-full absolute top-2">
            <Button
              onClick={() => {
                resetState();
              }}
              className="flex items-center justify-center w-10 h-10 bg-transparent hover:bg-[#45494f] p-2"
            >
              <ArrowLeftIcon />
            </Button>
          </section>
          {/* Preview */}
          <section className="flex items-center justify-between w-full h-[90%] gap-5">
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
              onContextMenu={handleShowMenu}
              className="flex overflow-x-auto snap-x snap-mandatory w-full h-full no-scrollbar"
            >
              {data?.statuses?.map(
                ({ statusId, mediaType, mediaUrl, message, createdAt }, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div
                        id={statusId}
                        data-index={i}
                        className="relative w-full h-full flex items-center justify-center shrink-0 snap-center"
                        ref={(el) => {
                          if (statusRefs.current) {
                            statusRefs.current[i] = el;
                          }
                        }}
                      >
                        <div className="relative w-auto h-full">
                          {selectedIndex === i && mediaType === "image" ? (
                            <img
                              src={mediaUrl}
                              alt="yaya"
                              className="w-auto h-auto max-h-full object-cover"
                            />
                          ) : selectedIndex === i && mediaType === "video" ? (
                            <video
                              className="w-auto h-full  max-h-full object-cover"
                              src={mediaUrl}
                              autoPlay
                            ></video>
                          ) : null}
                          {/* Profile section */}
                          <div className="absolute flex flex-col w-full h-20 top-3 gap-4 px-5">
                            <section className="flex items-center justify-center w-full gap-1">
                              {data?.statuses?.map((_, i) => {
                                return (
                                  <div
                                    key={i}
                                    className="bg-blue-500 w-full h-1 rounded-md"
                                  />
                                );
                              })}
                            </section>
                            <section className="flex w-full gap-4">
                              <img
                                src={data.alias.avatar || defaultImage}
                                alt="status-profile"
                                className="w-12 h-12 object-cover rounded-full"
                              />
                              <section className="flex flex-col items-start justify-center h-full text-white">
                                <p className="font-semibold text-[14px]">
                                  {data.alias.alias}
                                </p>
                                <p className="text-sm">
                                  {generateDateText2({
                                    date: new Date(createdAt),
                                  })}
                                  {", "}
                                  {new Date(createdAt).toLocaleTimeString(
                                    "id-ID",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </p>
                              </section>
                            </section>
                          </div>
                        </div>
                        {message && (
                          <Label className="absolute max-w-[200px] h-auto max-h-[60px] line-clamp-2 text-center text-sm bg-black/30 backdrop-blur text-white p-3 rounded-sm bottom-2">
                            {message}
                          </Label>
                        )}
                      </div>
                    </React.Fragment>
                  );
                }
              )}
            </div>
            <Button
              disabled={selectedIndex === (data?.statuses?.length as number) - 1}
              onClick={() => {
                if (selectedIndex !== null && selectedIndex !== undefined) {
                  handleScroll(selectedIndex + 1);
                }
              }}
            >
              <ChevronRightIcon />
            </Button>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
