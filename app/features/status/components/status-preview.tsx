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
import { useParams } from "react-router";
import { useUserStore } from "~/features/user/stores/user-store";
import { Label } from "shared/shadcn/label";
import { Separator } from "shared/shadcn/separator";
import { generateDateText2 } from "shared/helpers/generate-date";
import { defaultImage } from "shared/constants/image-default";

export default function StatusPreview() {
  // Refs
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const mediaRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const mediaType: "video" | "audio" | "file" | "image" = "image";

  // State
  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [menuPosition, setMenuPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const { user } = useUserStore();
  const { roomId } = useParams<{ roomId: string }>() as { roomId: string };

  // Handler
  const handleShowMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setOpenMenu(true);
  };

  const handleScroll = (index: number) => {
    if (index >= 0 && mediaRefs.current[index]) {
      mediaRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  };

  // Initial Scroll Handle
  //   React.useEffect(() => {
  //     if (mediaRefs.current) {
  //       const mediaIndex = mediaRefs.current.findIndex((m) => m?.id === chatId);
  //       if (mediaIndex >= 0 && mediaRefs.current[mediaIndex]) {
  //         mediaRefs.current[mediaIndex]?.scrollIntoView({
  //           behavior: "instant",
  //           inline: "center",
  //         });
  //       }
  //     }
  //   }, []);

  // Get Media Index
  //   React.useEffect(() => {
  //     if (!mediaRefs.current) return;
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         entries.forEach((entry) => {
  //           if (entry.isIntersecting) {
  //             const index = Number(entry.target.getAttribute("data-index"));
  //             setSelectedIndex(index);
  //           }
  //         });
  //       },
  //       { threshold: 0.8 }
  //     );

  //     mediaRefs.current.forEach((el) => {
  //       if (el) observer.observe(el);
  //     });

  //     return () => observer.disconnect();
  //   }, []);

  console.log(user?.userId);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className={`flex fixed flex-col w-full min-h-screen bg-[#232323]/80 z-50 top-0 bottom-0 left-0 right-0 backdrop-blur-md gap-1 px-3 py-2`}
      >
        {/* Header */}
        <section className="flex items-center justify-between w-full absolute top-2">
          <Button
            onClick={() => {}}
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
            {Array.from({ length: 5 }).map((_, i) => {
              return (
                <React.Fragment key={i}>
                  <div
                    data-index={i}
                    className="relative w-full h-full flex items-center justify-center shrink-0 snap-center"
                    ref={(el) => {
                      if (mediaRefs.current) {
                        mediaRefs.current[i] = el;
                      }
                    }}
                  >
                    <div className="relative w-auto h-full">
                      <img
                        src={
                          "https://i.pinimg.com/736x/55/f6/27/55f62793829b337449ff9b0b8ee3aed0.jpg"
                        }
                        alt={defaultImage}
                        className="w-auto h-auto max-h-full object-cover"
                      />
                      <div className="absolute flex flex-col w-full h-20 top-3 gap-4 px-5">
                        <section className="flex items-center justify-center w-full gap-1">
                          {Array.from({ length: 3 }).map(() => {
                            return (
                              <div className="bg-blue-500 w-full h-1 rounded-md" />
                            );
                          })}
                        </section>
                        <div className="flex w-full gap-4">
                          <img
                            src={
                              "https://i.pinimg.com/736x/55/f6/27/55f62793829b337449ff9b0b8ee3aed0.jpg"
                            }
                            alt="status-profile"
                            className="w-12 h-12 object-cover rounded-full"
                          />
                          <section className="flex flex-col items-start justify-center h-full text-white">
                            <p className="font-semibold text-[14px]">
                              {"Status Anda"}
                            </p>
                            <p className="text-sm">
                              {generateDateText2({
                                date: new Date(),
                              })}
                              {", "}
                              {new Date().toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </section>
                        </div>
                      </div>
                    </div>
                    <Label className="absolute max-w-[200px] h-auto max-h-[60px] line-clamp-2 text-center text-sm bg-black/30 backdrop-blur text-white p-3 rounded-sm bottom-2">
                      Tessti
                    </Label>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <Button
            disabled={selectedIndex === 1}
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
    </AnimatePresence>
  );
}
