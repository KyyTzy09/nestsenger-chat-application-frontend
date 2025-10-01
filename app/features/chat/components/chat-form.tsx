import React from "react";
import { Button } from "shared/shadcn/button";
import { cn } from "~/lib/utils";
import TextAreaAutoSize from "react-textarea-autosize";
import { PaperclipIcon, SendIcon, SmileIcon } from "lucide-react";

export default function ChatForm() {
  const formButtonIcon = [
    {
      Icon: SmileIcon,
    },
    {
      Icon: PaperclipIcon,
    },
  ];
  
  return (
    <form className="flex items-end justify-between w-full h-full p-3 gap-4">
      <div className="flex items-end justify-center h-full gap-2">
        {formButtonIcon.map(({ Icon }) => {
          return (
            <Button type="button" className="w-8 h-8 p-1 bg-transparent">
              <Icon />
            </Button>
          );
        })}
      </div>
      <TextAreaAutoSize
        minRows={1}
        maxRows={5}
        placeholder="Ketik Pesan"
        className={cn(
          "w-full min-h-7 text-white resize-none no-scrollbar text-justify p-2 text-sm",
          "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring"
        )}
      />
      <Button type="button" className="w-8 h-8 p-1 bg-transparent">
        <SendIcon />
      </Button>
    </form>
  );
}
