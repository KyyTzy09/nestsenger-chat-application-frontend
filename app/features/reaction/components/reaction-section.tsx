import React from "react";
import { useCreateReaction, useGetUserReaction } from "../hooks/reaction-hook";
import { Button } from "shared/shadcn/button";
import { PlusIcon } from "lucide-react";

interface ReactionSectionProps {
  chatId: string;
  onClose: () => void;
  setDisplay: React.Dispatch<React.SetStateAction<"menu" | "picker">>;
}

export default function ReactionSection({
  chatId,
  onClose,
  setDisplay,
}: ReactionSectionProps) {
  // Chat Reaction Handle
  const { mutate: createReactionMutate, isPending: isCreateReactionLoading } =
    useCreateReaction();

  // User Reaction Data
  const { data: userReactionResponse, isPending: onUserReactionLoading } =
    useGetUserReaction({ chatId });
  const reactionEmojiItems = ["👍", "❤", "😂", "😮", "😢", "🙏"];
  const filteredUserEmoji = reactionEmojiItems.filter((v) => {
    return v === userReactionResponse?.data?.content;
  });

  return (
    <section className="flex items-center justify-between">
      {reactionEmojiItems.map((e, i) => {
        return (
          <Button
            disabled={
              userReactionResponse?.data &&
              e === userReactionResponse?.data?.content
            }
            onClick={() => {
              createReactionMutate({
                chatId,
                content: e,
              });
              onClose();
            }}
            className={`${userReactionResponse?.data! && e === userReactionResponse?.data?.content ? "bg-gray-500/70" : "bg-transparent"} flex items-center text-xl justify-center w-10 h-10 hover:bg-gray-500/50 p-0`}
            key={i}
          >
            {e}
          </Button>
        );
      })}
      <Button
        onClick={() => setDisplay("picker")}
        className={`${userReactionResponse?.data! && filteredUserEmoji.length === 0 ? "bg-gray-500/70" : "bg-transparent"} flex items-center text-xl justify-center w-10 h-10 hover:bg-gray-500/50 p-0`}
      >
        {userReactionResponse?.data && filteredUserEmoji.length === 0 ? (
          <p>{userReactionResponse?.data?.content}</p>
        ) : (
          <PlusIcon />
        )}
      </Button>
    </section>
  );
}
