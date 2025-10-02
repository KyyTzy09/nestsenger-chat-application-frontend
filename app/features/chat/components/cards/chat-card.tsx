import React from "react";
import type { ChatType } from "shared/types/chat-type";

interface ChatCardProps {
  data: ChatType[] | [];
  userId: string;
}

export default function ChatCard({ data, userId }: ChatCardProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);
  return (
    <div className="flex flex-col w-full h-full gap-3">
      {data?.map(({ chatId, message, userId: senderId, createdAt }, i) => {
        return (
          <div
            className={`${senderId === userId ? "self-end bg-blue-500 rounded-tr-none" : "self-start bg-[#303030] rounded-tl-none"} relative flex flex-col max-w-[30%] min-w-20 h-auto text-white p-2 rounded-sm gap-1 shadow`}
            key={i}
          >
            <p className="text-[14px] break-all">{message}</p>
            <div className="flex items-center justify-end w-full">
              <p className="text-gray-300 text-[8px]">
                {new Date(createdAt).toLocaleTimeString()}
              </p>
            </div>
            <span
              className={`${senderId === userId ? "border-b-8 border-t-transparent border-l-8 border-l-blue-500 border-b-transparent -right-2" : "border-b-8 border-t-transparent border-r-8 border-r-[#303030] border-b-transparent -left-2"} absolute top-0 w-0 h-0`}
            ></span>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
