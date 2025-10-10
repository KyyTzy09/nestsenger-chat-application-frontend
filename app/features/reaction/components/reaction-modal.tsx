import React from "react";
import {
  useGetChatReactions,
  useGetUserReaction,
} from "../hooks/reaction-hook";
import { fa } from "zod/v4/locales";

interface ReactionModalProps {
  chatId: string;
}

export default function ReactionModal({ chatId }: ReactionModalProps) {
  const { data: chatReactionResponse, isPending } = useGetChatReactions({
    chatId,
  });
  return (
    <>
      {chatReactionResponse?.data! && !isPending && (
        <button className="absolute flex items-center justify-center min-w-6 h-6 right-1 -bottom-4 bg-[#353535] rounded-full p-2 overflow-hidden">
          <div className="flex items-center justify-center">
            {chatReactionResponse?.data.length > 0 &&
              chatReactionResponse?.data.map(({ reaction: { content } }, i) => {
                return (
                  <p key={i} className="text-sm">
                    {content}
                  </p>
                );
              })}
          </div>
          <p className="text-sm text-gray-400">
            {chatReactionResponse?.data?.length || 0}
          </p>
        </button>
      )}
    </>
  );
}
