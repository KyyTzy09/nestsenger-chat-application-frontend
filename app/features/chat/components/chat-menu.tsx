import { CopyIcon, PlusIcon, ReplyIcon, Trash2Icon } from "lucide-react";
import { AnimatePresence, m, motion } from "motion/react";
import React from "react";
import { Button } from "shared/shadcn/button";
import { Separator } from "shared/shadcn/separator";
import { useChatParentDataStore } from "../stores/chat-store";

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
  // Chat context handle
  const chatMenuRef = React.useRef<HTMLDivElement>(null);
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

      setPosition({ x, y });
    }
  }, [open, position]);

  React.useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        chatMenuRef.current &&
        !chatMenuRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
  }, [onClose]);

  // Menu Item Handle
  const { setParent } = useChatParentDataStore();
  const reactionEmojiItems = ["👍", "❤", "😂", "😮", "😢", "🙏"];
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
        onClose();
      },
    },
  ];

  return (
    <AnimatePresence>
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
            className="fixed z-50 flex flex-col w-[300px] bg-[#252525]/70 text-white rounded-md shadow-lg backdrop-blur p-2 gap-1"
            style={{
              top: position?.y,
              left: position?.x,
            }}
          >
            <section className="flex items-center justify-between">
              {reactionEmojiItems.map((e, i) => {
                return (
                  <Button
                    className="flex items-center text-xl justify-center w-10 h-10 bg-transparent p-0"
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
        </>
      )}
    </AnimatePresence>
  );
}
