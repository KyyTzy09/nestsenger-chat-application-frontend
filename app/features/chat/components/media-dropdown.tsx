import EmojiPicker, { Theme } from "emoji-picker-react";
import { FileIcon, ImageIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Label } from "shared/shadcn/label";
import { useCreateMediaStore } from "../stores/create-media-store";
import { GetMediaType } from "./logic/media-type-logic";

interface MediaDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaDropdown({ isOpen, onClose }: MediaDropdownProps) {
  const [selectedMedia, setSelectedMedia] = React.useState<File[] | null>(null);

  const { chat, setChat } = useCreateMediaStore();
  const mediaDropDownItems = [
    {
      text: "Foto & Video",
      Icon: ImageIcon,
      type: "image/*,video/*",
    },
    {
      text: "Dokumen",
      Icon: FileIcon,
      type: "",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const media = e.target.files?.[0];
    if (media) {
      const mediaUrl = URL.createObjectURL(media);
      setChat({
        file: media,
        fileUrl: mediaUrl,
        fileType: GetMediaType(media.name),
      });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 30 }}
            className="absolute z-50 bottom-14 left-10 flex min-w-20 bg-[#252525]/30 text-gray-300 rounded-md shadow-lg backdrop-blur"
          >
            <div className="flex flex-col items-center justify-start w-full h-full p-1 gap-3">
              {mediaDropDownItems.map(({ Icon, text, type }) => {
                return (
                  <Label className="flex items-center justify-start w-full gap-2 hover:bg-[#353535] p-1 rounded-sm">
                    <input
                      onChange={handleChange}
                      title={text}
                      className="hidden w-full"
                      type="file"
                      accept={type}
                    />
                    <Icon className="w-5 h-5" />
                    {text}
                  </Label>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
