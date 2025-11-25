import EmojiPicker, { Theme } from "emoji-picker-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

interface ChatEmojiPickerProps {
  isOpen: boolean;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}

export default function ChatEmojiPicker({
  isOpen,
  onSelect,
  onClose,
}: ChatEmojiPickerProps) {
  const chatEmojiPickerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        chatEmojiPickerRef.current &&
        !chatEmojiPickerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={chatEmojiPickerRef}
          initial={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 30 }}
          className="absolute bottom-12 left-0 z-60"
        >
          <EmojiPicker
            lazyLoadEmojis={true}
            theme={Theme.DARK}
            open={isOpen}
            onEmojiClick={(emoji) => onSelect((prev) => prev + emoji.emoji)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
