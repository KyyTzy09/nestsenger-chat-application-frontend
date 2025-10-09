import React from "react";
import { useCreateReaction, useGetUserReaction } from "../hooks/reaction-hook";
import { Button } from "shared/shadcn/button";
import { PlusIcon } from "lucide-react";

interface ReactionSectionProps {
  chatId: string;
  onClose: () => void;
}

export default function ReactionSection({
  chatId,
  onClose,
}: ReactionSectionProps) {
  // Chat Reaction Handle
  const { mutate: createReactionMutate, isPending: isCreateReactionLoading } =
    useCreateReaction();

  // User Reaction Data
  const { data: userReactionResponse, isPending: onUserReactionLoading } =
    useGetUserReaction({ chatId });
  const reactionEmojiItems = ["👍", "❤", "😂", "😮", "😢", "🙏"];

  return (
    <section className="flex items-center justify-between">
      {userReactionResponse?.data &&
        reactionEmojiItems.map((e, i) => {
          return (
            <Button
              onClick={() => {
                createReactionMutate({
                  chatId,
                  content: e,
                });
                onClose();
              }}
              className={`${e === userReactionResponse?.data?.content ? "bg-gray-500/70" : "bg-transparent"} flex items-center text-xl justify-center w-10 h-10 hover:bg-gray-500/50 p-0`}
              key={i}
            >
              {e}
            </Button>
          );
        })}
      <Button className="flex items-center text-xl justify-center w-10 h-10 bg-transparent p-0">
        <PlusIcon />
      </Button>
    </section>
  );
}
