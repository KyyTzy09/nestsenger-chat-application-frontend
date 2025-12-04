import React from "react";
import {
  useDeleteReactionById,
  useGetChatReactions,
} from "../hooks/reaction-hook";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "shared/shadcn/button";
import type { UserType } from "shared/types/user-type";
import { defaultImage } from "shared/constants/image-default";
import type { FriendType } from "shared/types/friend-type";
import { reactionGroupper } from "shared/helpers/group-emoji";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "shared/configs/socket";
import { useParams } from "react-router";
import { toast } from "sonner";
import type { ReactionType } from "shared/types/reaction-type";
import ReactionCard from "./cards/reaction-card";
import type { AliasType } from "shared/types/alias-type";

interface ReactionModalProps {
  reactions: { reaction: ReactionType; user: AliasType }[];
  chatId: string;
  currentUserId: string;
}

export default function ReactionModal({
  chatId,
  reactions,
  currentUserId,
}: ReactionModalProps) {
  // Groupping
  const grouppedReaction = reactionGroupper(reactions as []);

  // Filtering
  const [currentEmoji, setCurrentEmoji] = React.useState<string>("");
  const filteredReaction = reactions?.filter(
    ({ reaction }) => {
      if (currentEmoji !== "") {
        return reaction?.content?.includes(currentEmoji);
      } else {
        return true;
      }
    }
  );

  console.log()
  const sortedReactionsData = filteredReaction?.sort((a) => {
    return a?.reaction?.userId === currentUserId ? -1 : 0;
  });

  // Display
  const reactionModalRef = React.useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [modalPosition, setModalPosition] = React.useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleShowModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalPosition({ x: e.clientX, y: e.clientY });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    if (showModal && modalPosition && reactionModalRef.current) {
      const { innerWidth, innerHeight } = window;
      const modalRect = reactionModalRef.current.getBoundingClientRect();
      let x = modalPosition.x;
      let y = modalPosition.y;

      if (x + modalRect.width > innerWidth) {
        x = innerWidth - modalRect.width - 8;
      }

      if (y + modalRect.height > innerHeight) {
        y = innerHeight - modalRect.height - 8;
      }

      setModalPosition({ x, y });
    }
  }, [showModal, setModalPosition]);

  return (
    <>
      {reactions &&  (
        <>
          {/* Modal trigger */}
          <button
            onClick={handleShowModal}
            className="absolute flex items-center justify-center min-w-6 h-6 right-1 -bottom-4 bg-[#353535] rounded-full cursor-pointer p-2 overflow-hidden"
          >
            <div className="flex items-center justify-center">
              {grouppedReaction?.length > 0 &&
                grouppedReaction?.map(({ emoji }, i) => {
                  return (
                    <p key={i} className="text-sm">
                      {emoji}
                    </p>
                  );
                })}
            </div>
            <p className="text-sm text-gray-400">
              {reactions.length || 0}
            </p>
          </button>
          <AnimatePresence>
            {showModal && (
              <>
                <motion.div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={handleCloseModal}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  ref={reactionModalRef}
                  className="fixed z-50 flex flex-col w-[300px] max-h-[250px] bg-[#252525] text-white rounded-md shadow-lg p-2 gap-1 -translate-y-16 overflow-hidden"
                  initial={{
                    opacity: 0,
                    translateY: -50,
                  }}
                  animate={{
                    opacity: 1,
                    translateY: 0,
                  }}
                  exit={{
                    opacity: 0,
                    translateY: -50,
                  }}
                  style={{
                    top: modalPosition.y,
                    left: modalPosition.x,
                  }}
                >
                  <section className="flex items-center justify-start w-full min-h-10 overflow-x-auto custom-scrollbar gap-1">
                    <Button
                      onClick={() => setCurrentEmoji("")}
                      className={`${currentEmoji === "" ? "border-b-2 border-blue-500" : "border-b-0 border-none"} flex items-center text-sm justify-center h-10 bg-transparent rounded-b-none hover:bg-transparent p-1 px-2 font-normal transition-all`}
                    >
                      <p>Semua {reactions?.length}</p>
                    </Button>
                    {grouppedReaction?.map(({ emoji, count }) => {
                      return (
                        <Button
                          onClick={() => setCurrentEmoji(emoji)}
                          key={emoji}
                          className={`${currentEmoji === emoji ? "border-b-2 border-blue-500" : "border-b-0 border-none"} flex items-center text-sm justify-center w-10 h-10 bg-transparent hover:bg-transparent p-0 rounded-b-none transition-all`}
                        >
                          <p>
                            {emoji} {count}
                          </p>
                        </Button>
                      );
                    })}
                  </section>
                  <ReactionCard
                    data={sortedReactionsData as []}
                    currentUserId={currentUserId}
                    chatId={chatId}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}
