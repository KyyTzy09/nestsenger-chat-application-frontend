import React from "react";
import { Button } from "shared/shadcn/button";
import { cn } from "~/lib/utils";
import TextAreaAutoSize from "react-textarea-autosize";
import { LoaderIcon, PaperclipIcon, SendIcon, SmileIcon } from "lucide-react";
import { useCreateChat } from "../hooks/chat-hook";
import EMojiPicker, { Theme } from "emoji-picker-react";
import ChatEmojiPicker from "./chat-emoji";

interface ChatFormProps {
  roomId: string;
}

export default function ChatForm({ roomId }: ChatFormProps) {
  const [message, setMessage] = React.useState<string>("");
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);

  const { mutate: createChatMutate, isPending: onCreateChatLoad } =
    useCreateChat(roomId);

  const formButtonIcon = [
    {
      Icon: SmileIcon,
      action: () => setShowEmoji((prev) => !prev),
    },
    {
      Icon: PaperclipIcon,
      action: () => {},
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createChatMutate({ message });
    setMessage("");
  };

  return (
    <>
      <ChatEmojiPicker isOpen={showEmoji} onClose={() => setShowEmoji(false)} onSelect={setMessage} />
      <form
        onSubmit={handleSubmit}
        className="flex items-end justify-between w-full h-full p-3 gap-4"
      >
        <div className="flex items-end justify-center h-full gap-2">
          {formButtonIcon.map(({ Icon, action }) => {
            return (
              <Button
                onClick={action}
                type="button"
                className="w-8 h-8 p-1 bg-transparent"
              >
                <Icon />
              </Button>
            );
          })}
        </div>
        <TextAreaAutoSize
          value={message}
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
          <Button type="submit" className="w-8 h-8 p-1 bg-transparent">
            {onCreateChatLoad ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <SendIcon />
            )}
          </Button>
        )}
      </form>
    </>
  );
}
