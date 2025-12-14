import { Label } from "@radix-ui/react-label";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { generateDateText2 } from "shared/helpers/generate-date";
import type { StatusViewer } from "shared/types/status-type";

interface ViewerPreviewProps {
  viewers: StatusViewer[];
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function ViewerPreview({
  viewers = [],
  isOpen,
  onCloseAction,
}: ViewerPreviewProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseAction}
            className="fixed w-full h-full top-0 z-80"
          />
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 30 }}
            transition={{ duration: 0.15 }}
            className="fixed z-100 flex flex-col w-[300px] max-h-[300px] bg-[#252525]/70 text-white rounded-md shadow-lg backdrop-blur bottom-4 left-[40%] p-4 gap-2"
          >
            <section className="flex items-center justify-start w-full gap-2">
              <p className="text-gray-200 text-[16px]">
                Dilihat oleh: {viewers?.length}
              </p>
            </section>
            <section className="flex flex-col items-center w-full h-full overflow-y-auto gap-2">
              {viewers?.length > 0 ? (
                viewers?.map(
                  (
                    {
                      friend: {
                        alias,
                        friend: { avatar },
                      },
                      updatedAt,
                    },
                    i
                  ) => {
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-start w-full h-12 gap-3 rounded-md z-10 py-2"
                      >
                        <section className="relative flex items-center justify-center w-10 h-10 rounded-full">
                          <img
                            src={avatar}
                            alt={defaultImage}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </section>
                        <section className="flex flex-col items-start justify-center h-full text-white">
                          <p className="font-semibold text-sm">{alias}</p>
                          {true && (
                            <p className="text-[12px] text-gray-300">
                              {generateDateText2({ date: new Date(updatedAt) })}
                              {", "}
                              {new Date(updatedAt).toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          )}
                        </section>
                      </div>
                    );
                  }
                )
              ) : (
                <div className="flex w-full items-center justify-center">
                  <p className="text-gray-300 text-[15px]">
                    Belum Ada Penonton
                  </p>
                </div>
              )}
            </section>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
