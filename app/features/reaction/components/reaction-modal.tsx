import React from "react";
import {
  useDeleteReactionById,
  useGetChatReactions,
} from "../hooks/reaction-hook";
import { fa } from "zod/v4/locales";
import { motion } from "motion/react";
import { Button } from "shared/shadcn/button";
import type { UserType } from "shared/types/user-type";
import { defaultImage } from "shared/constants/image-default";
import type { FriendType } from "shared/types/friend-type";

interface ReactionModalProps {
  chatId: string;
  currentUserId: string;
}

export default function ReactionModal({
  chatId,
  currentUserId,
}: ReactionModalProps) {
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

  // Query

  const { data: chatReactionResponse, isPending } = useGetChatReactions({
    chatId,
  });
  const { mutate: deleteReactionMutation, isPending: deleteReactionLoading } =
    useDeleteReactionById({ chatId });

  return (
    <>
      {chatReactionResponse?.data! && !isPending && (
        <>
          {/* Modal trigger */}
          <button
            onClick={handleShowModal}
            className="absolute flex items-center justify-center min-w-6 h-6 right-1 -bottom-4 bg-[#353535] rounded-full cursor-pointer p-2 overflow-hidden"
          >
            <div className="flex items-center justify-center">
              {chatReactionResponse?.data.length > 0 &&
                chatReactionResponse?.data.map(
                  ({ reaction: { content } }, i) => {
                    return (
                      <p key={i} className="text-sm">
                        {content}
                      </p>
                    );
                  }
                )}
            </div>
            <p className="text-sm text-gray-400">
              {chatReactionResponse?.data?.length || 0}
            </p>
          </button>
          {showModal && (
            <>
              {/* Modal Content */}
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
                style={{
                  top: modalPosition.y,
                  left: modalPosition.x,
                }}
              >
                <section className="flex items-center justify-start w-full min-h-10 overflow-x-auto custom-scrollbar gap-1">
                  <Button className="flex items-center text-sm justify-center h-10 bg-transparent hover:bg-transparent p-1 px-2 font-normal">
                    <p>Semua {chatReactionResponse?.data?.length}</p>
                  </Button>
                  {chatReactionResponse?.data.map(
                    ({ reaction: { content, reactionId } }) => {
                      return (
                        <Button className="flex items-center text-sm justify-center w-10 h-10 bg-transparent hover:bg-transparent p-0 rounded-b-none">
                          <p key={reactionId}>
                            {content}{" "}
                            {
                              chatReactionResponse?.data?.filter(
                                ({ reaction }) =>
                                  reaction.content.includes(content)
                              )?.length
                            }
                          </p>
                        </Button>
                      );
                    }
                  )}
                </section>
                <section className="flex flex-col w-full overflow-y-auto custom-scrollbar">
                  {chatReactionResponse?.data.map(
                    ({ reaction: { reactionId, userId }, alias }) => {
                      return (
                        <button
                          onClick={() => {
                            deleteReactionMutation({ reactionId });
                            handleCloseModal()
                          }}
                          disabled={currentUserId !== userId}
                          className={`${currentUserId === userId && "hover:bg-[#45494f]/50"} flex items-center justify-start-full h-14 p-2 gap-2 rounded-sm`}
                        >
                          <div className="min-w-10 h-10">
                            <img
                              src={
                                alias
                                  ? (alias as UserType)?.profile?.avatar ||
                                    (alias as FriendType)?.friend?.avatar
                                  : defaultImage
                              }
                              className="w-full h-full rounded-full"
                              alt="avatar"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start h-full">
                            <p className="text-sm line-clamp-1">
                              {alias && currentUserId === userId
                                ? "Anda"
                                : (alias as FriendType)?.alias ||
                                  (alias as UserType)?.email ||
                                  ""}
                            </p>
                            {currentUserId === userId && (
                              <p className="text-[12px] text-gray-400">
                                Pilih untuk menghapus
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    }
                  )}
                </section>
              </motion.div>
            </>
          )}
        </>
      )}
    </>
  );
}
