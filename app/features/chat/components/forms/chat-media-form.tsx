import {
  CropIcon,
  PlusIcon,
  RedoDotIcon,
  SendIcon,
  Smile,
  SmileIcon,
  Trash2Icon,
} from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import { cn } from "~/lib/utils";

export default function ChatMediaForm() {
  const [message, setMessage] = React.useState<string>("");

  const headerMenu = [
    {
      title: "Potong",
      Icon: CropIcon,
      action: () => {},
    },
    {
      title: "Putar",
      Icon: RedoDotIcon,
      action: () => {},
    },
    {
      title: "Hapus",
      Icon: Trash2Icon,
      action: () => {},
    },
  ];

  const handleEnterSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <motion.div className="absolute flex flex-col items-center justify-between min-w-[40%] min-h-[60%] w-auto h-auto max-w-[50%] max-h-[100%] rounded-sm bg-[#252525]/70 text-white shadow-lg backdrop-blur border-black border bottom-5 left-10 z-50 overflow-hidden">
      <section className="flex items-center justify-start w-full h-[12%] bg-[#141414] px-2 py-1 gap-2">
        {headerMenu.map(({ title, Icon, action }, i) => {
          return (
            <Button
              key={i}
              title={title}
              onClick={action}
              type="button"
              className="w-10 h-10 p-1 bg-transparent hover:bg-gray-600"
            >
              <Icon />
            </Button>
          );
        })}
      </section>
      <section className="flex items-center justify-center w-[90%] h-[80%] p-5">
        <img
          className="w-auto max-w-full h-full object-cover"
          src={defaultImage}
          alt="default"
        />
      </section>
      <section className="flex flex-col items-center justify-center w-full h-[20%] bg-[#141414] py-2 px-5 gap-5">
        <div className="flex items-start justify-between w-full h-auto gap-1">
          <Button
            onClick={() => {}}
            type="button"
            className="w-9 h-9 p-1 bg-transparent hover:bg-gray-600"
          >
            <SmileIcon />
          </Button>
          <TextAreaAutoSize
            value={message}
            onKeyDown={handleEnterSubmit}
            onChange={(e) => setMessage(e.target.value)}
            minRows={1}
            maxRows={5}
            required
            placeholder="Ketik Pesan"
            className={cn(
              "w-full min-h-7 text-white resize-none no-scrollbar text-justify p-2 text-sm",
              "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring"
            )}
          />
          {message.length > 0 && (
            <Button
              type="submit"
              className="flex items-center justify-center w-8 h-8 p-1 bg-transparent hover:bg-gray-600"
            >
              <SendIcon />
            </Button>
          )}
        </div>
        <div className="flex items-center justify-center w-full gap-2">
          {Array.from({ length: 10 }).map((_, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-sm"
              >
                <PlusIcon />
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
