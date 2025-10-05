import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { linkify } from "shared/helpers/linkify";
import type { ChatType } from "shared/types/chat-type";
import type { FriendType } from "shared/types/friend-type";
import type { UserType } from "shared/types/user-type";
import { useCreateOrGetRoom } from "~/features/room/hooks/room-hooks";
import ChatParentSection from "../sections/chat-parent-section";

interface GroupChatCardProps {
  data: { chat: ChatType; alias: FriendType | UserType }[] | [];
  userId: string;
}

export default function GroupChatCard({ data, userId }: GroupChatCardProps) {
  const { mutate: createOrGetRoomMutate, isPending: onCreateOrGetRoomLoading } =
    useCreateOrGetRoom();

  const [selectedIndex, setSelectedIndex] = React.useState<number[]>([]);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const findChatIndex = (index: number) => {
    return selectedIndex?.includes(index);
  };

  const handleExpandChat = (index: number) => {
    setSelectedIndex((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];

      if (safePrev?.includes(index)) {
        return prev?.filter((i) => i !== index);
      } else {
        return [...safePrev, index];
      }
    });
  };

  React.useEffect(() => {
    setSelectedIndex([]);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data, setSelectedIndex]);

  return (
    <div className="flex flex-col w-full h-full gap-2">
      {data?.map(
        (
          { chat: { chatId, message, userId: senderId, createdAt, parent }, alias },
          i
        ) => {
          return (
            <div
              key={chatId}
              className={`${senderId === userId ? "justify-end rounded-tr-none" : "justify-start rounded-tl-none"} flex items-start w-full h-auto gap-2`}
            >
              {senderId !== userId && (
                <button
                  onClick={() => createOrGetRoomMutate({ userIdB: senderId })}
                  title="btn-img"
                  className="group w-10 h-10 rounded-full overflow-hidden"
                >
                  <img
                    src={
                      alias
                        ? (alias as FriendType)?.friend?.avatar ||
                          (alias as UserType)?.profile?.avatar
                        : defaultImage
                    }
                    className="w-full h-full group-hover:opacity-80"
                    alt=""
                  />
                </button>
              )}
              <section
                className={`${senderId === userId ? "bg-blue-500 rounded-tr-none" : "bg-[#303030] rounded-tl-none"} relative flex flex-col max-w-[55%] min-w-24 h-auto text-white p-2 rounded-sm shadow`}
              >
                {senderId !== userId && (
                  <div className="flex items-center w-full">
                    <p className={"text-blue-500 text-[12px] font-semibold"}>
                      {alias
                        ? (alias as FriendType)?.alias ||
                          "~" + (alias as UserType).email
                        : "Pengguna"}
                    </p>
                  </div>
                )}
                {parent && <ChatParentSection chatId={chatId} />}
                <p
                  className={`${findChatIndex(i) && message.length > 700 ? "line-clamp-none" : "line-clamp-6"} text-sm break-words`}
                >
                  {linkify(message)}
                </p>
                <div
                  className={`${findChatIndex(i) && message.length < 700 ? "justify-end-safe" : "justify-between"} flex items-center w-full text-[11px]`}
                >
                  {!findChatIndex(i) && message.length > 700 ? (
                    <button
                      onClick={() => handleExpandChat(i)}
                      className=" text-white underline text-[12px] hover:opacity-70"
                    >
                      Selengkapnya
                    </button>
                  ) : (
                    <button
                      title="prev"
                      className=" text-white underline text-[12px] hover:opacity-70"
                    ></button>
                  )}
                  <p className="text-gray-300">
                    {new Date(createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <span
                  className={`${senderId === userId ? "self-end border-b-8 border-t-transparent border-l-8 border-l-blue-500 border-b-transparent -right-2" : "border-b-8 border-t-transparent border-r-8 border-r-[#303030] border-b-transparent -left-2"} absolute top-0 w-0 h-0`}
                ></span>
              </section>
            </div>
          );
        }
      )}
      <div ref={bottomRef} />
    </div>
  );
}
