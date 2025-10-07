import React from "react";
import { Button } from "shared/shadcn/button";
import { cn } from "~/lib/utils";
import TextAreaAutoSize from "react-textarea-autosize";
import {
  LoaderIcon,
  PaperclipIcon,
  SendIcon,
  SmileIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react";
import { useCreateChat } from "../hooks/chat-hook";
import ChatEmojiPicker from "./chat-emoji";
import { useChatParentDataStore } from "../stores/chat-store";

interface ChatFormProps {
  roomId: string;
}

export default function ChatForm({ roomId }: ChatFormProps) {
  const [message, setMessage] = React.useState<string>("");
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  const { parent: chatParentState, resetState } = useChatParentDataStore();

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
      <ChatEmojiPicker
        isOpen={showEmoji}
        onClose={() => setShowEmoji(false)}
        onSelect={setMessage}
      />
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
        <div className="flex flex-col items-center justify-start w-full h-auto">
          {chatParentState?.parentId && (
            <section className="flex items-start justify-between w-full h-auto p-2 bg-gray-500/40 rounded-md border-l-[5px] border-blue-700 break-words">
              <div className="flex flex-col items-start justify-between w-full h-auto text-start">
                <p className="flex items-center justify-start w-full text-[12px] text-blue-500 font-semibold">
                  {chatParentState?.alias}
                </p>
                <p className="line-clamp- text-sm text-gray-300">
                  {chatParentState?.message}
                </p>
              </div>
              <Button
                onClick={() => resetState()}
                title="delete"
                className=" w-3 h-full bg-transparent hover:bg-[#303030]"
              >
                <XCircleIcon className="w-2 h-2 text-white" />
              </Button>
            </section>
          )}
          <div className="flex items-center w-full gap-1">
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
          </div>
        </div>
      </form>
    </>
  );
}
