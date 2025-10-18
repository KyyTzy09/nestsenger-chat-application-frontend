import { CopyIcon, PlusIcon, ReplyIcon, Trash2Icon } from "lucide-react";
import { AnimatePresence, m, motion } from "motion/react";
import React from "react";
import { Button } from "shared/shadcn/button";
import { Separator } from "shared/shadcn/separator";
import { useChatParentDataStore } from "../stores/chat-store";
import { useCreateReaction } from "~/features/reaction/hooks/reaction-hook";
import ReactionSection from "~/features/reaction/components/reaction-section";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { cn } from "~/lib/utils";
import DeleteChatModal from "./delete-chat-modal";

interface ChatMenuProps {
  open: boolean;
  chatParent: {
    parentId: string;
    content?: string | null;
    alias: string;
    message: string;
  };
  position: { x: number; y: number };
  setPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
  onClose: () => void;
}

export default function ChatMenu({
  chatParent,
  onClose,
  open,
  position,
  setPosition,
}: ChatMenuProps) {
  const [display, setDisplay] = React.useState<"menu" | "picker">("menu");
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);

  // Chat context handle
  const chatMenuRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    setDisplay("menu");
  }, [open, setDisplay]);

  React.useEffect(() => {
    if (open && position && chatMenuRef.current) {
      const { innerWidth, innerHeight } = window;
      const menuRect = chatMenuRef.current.getBoundingClientRect();
      let x = position.x;
      let y = position.y;

      if (x + menuRect.width > innerWidth) {
        x = innerWidth - menuRect.width - 8;
      }

      if (y + menuRect.height > innerHeight) {
        y = innerHeight - menuRect.height - 8;
      }

      if (x !== position.x || y !== position.y) {
        setPosition({ x, y });
      }
    }
  }, [open, position]);

  // Menu Item Handle
  const { setParent } = useChatParentDataStore();
  const chatButtonMenuItems = [
    {
      Icon: ReplyIcon,
      text: "Balas",
      action: () => {
        setParent({ parent: chatParent });
        onClose();
      },
    },
    {
      Icon: CopyIcon,
      text: "Salin",
      action: () => {
        navigator.clipboard.writeText(chatParent?.message);
        onClose();
      },
    },
    {
      Icon: Trash2Icon,
      text: "Hapus Pesan",
      action: () => {
        setShowDeleteModal(true);
        onClose();
      },
    },
  ];

  // Reaction
  const { mutate: createReactionMutate, isPending: isCreateReactionLoading } =
    useCreateReaction();

  return (
    <AnimatePresence>
      <DeleteChatModal
        onOpen={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        chatId={chatParent.parentId}
      />
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={chatMenuRef}
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 flex flex-col w-[300px] bg-[#252525]/70 text-white rounded-md shadow-lg backdrop-blur"
            style={{
              top: position?.y,
              left: position?.x,
            }}
          >
            {display === "menu" ? (
              <motion.div className="flex flex-col w-full h-full gap-1 p-2">
                <ReactionSection
                  setDisplay={setDisplay}
                  chatId={chatParent.parentId}
                  onClose={onClose}
                />
                <Separator className="opacity-70" />
                {chatButtonMenuItems.map(({ Icon, action, text }, i) => {
                  return (
                    <Button
                      key={i}
                      onClick={action}
                      className="flex items-center justify-start bg-transparent hover:bg-gray-500/70 rounded-sm"
                    >
                      <Icon />
                      {text}
                    </Button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div className="flex w-full max-w-full h-full gap-1">
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    createReactionMutate({
                      chatId: chatParent?.parentId,
                      content: emoji.emoji,
                    });
                    onClose();
                  }}
                  lazyLoadEmojis={false}
                  theme={Theme.DARK}
                  className={cn(`bg-transparent relative`)}
                  emojiStyle={EmojiStyle.NATIVE}
                />
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
