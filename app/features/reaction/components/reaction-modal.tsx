import React from "react";
import { useGetUserReaction } from "../hooks/reaction-hook";
import { fa } from "zod/v4/locales";

interface ReactionModalProps {
  chatId: string;
}

export default function ReactionModal({ chatId }: ReactionModalProps) {
  const { data: userReactionResponse, isPending: onUserReactionLoading } =
    useGetUserReaction({ chatId });
  return (
    <>
      {userReactionResponse?.data! && !onUserReactionLoading && (
        <div className="absolute flex items-center justify-center w-6 h-6 right-1 -bottom-4 bg-[#353535] rounded-full p-2 overflow-hidden">
          <p className="text-sm">{userReactionResponse?.data?.content}</p>
        </div>
      )}
    </>
  );
}
