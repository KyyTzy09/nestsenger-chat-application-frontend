import { motion } from "motion/react";
import React from "react";
import type { AliasType } from "shared/types/alias-type";
import type { ReactionType } from "shared/types/reaction-type";
import { useDeleteReactionById } from "../../hooks/reaction-hook";
import { defaultImage } from "shared/constants/image-default";

interface ReactionCardProps {
  data: { reaction: ReactionType; user: AliasType }[];
  currentUserId: string;
  chatId: string;
}
export default function ReactionCard({
  data,
  currentUserId,
  chatId,
}: ReactionCardProps) {
  const { mutate: deleteReactionMutation, isPending: deleteReactionLoading } =
    useDeleteReactionById({ chatId });
  return (
    <section className="flex flex-col w-full overflow-y-auto custom-scrollbar">
      {data?.map(({ reaction: { reactionId, userId, content }, user }, i) => {
        return (
          <motion.button
            initial={{ translateY: 20 }}
            whileInView={{ translateY: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              ease: "easeOut",
            }}
            onClick={() => {
              deleteReactionMutation({ reactionId });
            }}
            disabled={currentUserId !== userId}
            className={`${currentUserId === userId && "hover:bg-[#45494f]/50"} flex items-center justify-start h-14 p-2 gap-2 rounded-sm`}
          >
            <div className="min-w-10 max-w-[15%] h-10">
              <img
                src={user ? user.avatar : defaultImage}
                className="w-full h-full rounded-full"
                alt="avatar"
              />
            </div>
            <div
              className={`flex flex-col items-start ${currentUserId === userId ? "justify-start" : "justify-center"} self-start w-[70%] h-full`}
            >
              <p
                className={`${currentUserId === userId ? "text-sm" : "text-[15px]"} line-clamp-1 text-start`}
              >
                {user && currentUserId === userId ? "Anda" : user.alias}
              </p>
              {currentUserId === userId && (
                <p className="text-[12px] text-gray-400">
                  Pilih untuk menghapus
                </p>
              )}
            </div>
            <div className="w-[10%]">
              <p>{content}</p>
            </div>
          </motion.button>
        );
      })}
    </section>
  );
}
