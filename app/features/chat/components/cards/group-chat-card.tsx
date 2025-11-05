import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { linkify } from "shared/helpers/linkify";
import type { ChatType } from "shared/types/chat-type";
import { useCreateOrGetRoom } from "~/features/room/hooks/room-hooks";
import ChatParentSection from "../sections/chat-parent-section";
import ChatMenu from "../chat-menu";
import ReactionModal from "~/features/reaction/components/reaction-modal";
import type { DeletedChatType } from "shared/types/deleted-chat";
import { BanIcon, CheckCheckIcon } from "lucide-react";
import type { AliasType } from "shared/types/alias-type";
import {
  chatDeletedOwnedLogic,
  isChatDeletedLogic,
} from "../logic/deleted-chat-logic";

interface GroupChatCardProps {
  data: { chat: ChatType; alias: AliasType }[] | [];
  deletedData?: DeletedChatType[];
  currentUserId: string;
}

export default function GroupChatCard({
  data,
  deletedData,
  currentUserId,
}: GroupChatCardProps) {
  const prevChatLength = React.useRef<number>(0);

  // Chat menu handle
  const [showMenu, setShowMenu] = React.useState<string>("");
  const [menuPosition, setMenuPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleShowContextMenu = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setShowMenu(chatId);
  };

  // onClick room card handle
  const { mutate: createOrGetRoomMutate, isPending: onCreateOrGetRoomLoading } =
    useCreateOrGetRoom();

  // Expand chat handler
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
    if (data) {
      if (data.length > prevChatLength.current) {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      prevChatLength.current = data.length;
    }
  }, [data, setSelectedIndex]);

  return (
    <div className="flex flex-col w-full h-full gap-2">
      {data?.map(
        (
          {
            chat: {
              chatId,
              message,
              userId: senderId,
              createdAt,
              parent,
              reactions,
            },
            alias,
          },
          i
        ) => {
          return (
            <div
              key={chatId}
              className={`${isChatDeletedLogic(deletedData as [], { currentUserId, chatId }) === "deleted" ? "hidden" : "flex"} ${senderId === currentUserId ? "justify-end rounded-tr-none" : "justify-start rounded-tl-none"} relative items-start w-full h-auto gap-2 ${reactions.length > 0 ? "mb-5" : "mb-0"}`}
            >
              {senderId !== currentUserId && (
                <button
                  onClick={() => createOrGetRoomMutate({ userIdB: senderId })}
                  title="btn-img"
                  className="group w-10 h-10 rounded-full overflow-hidden"
                >
                  <img
                    src={alias ? alias.avatar : defaultImage}
                    className="w-full h-full group-hover:opacity-80"
                    alt=""
                  />
                </button>
              )}
              <section
                onContextMenu={(e) => handleShowContextMenu(e, chatId)}
                className={`${senderId === currentUserId ? "bg-blue-500 rounded-tr-none" : "bg-[#303030] rounded-tl-none"} relative flex flex-col max-w-[55%] min-w-[120px] h-auto text-white p-2 rounded-sm shadow`}
              >
                {senderId !== currentUserId && (
                  <div className="flex items-center w-full">
                    <p className={"text-blue-500 text-[12px] font-semibold"}>
                      {alias ? alias.name : "Pengguna"}
                    </p>
                  </div>
                )}
                {!isChatDeletedLogic(deletedData as [], {
                  currentUserId,
                  chatId,
                }) &&
                  parent && (
                    <ChatParentSection
                      currentUserId={currentUserId}
                      chatId={chatId}
                    />
                  )}
                {isChatDeletedLogic(deletedData as [], {
                  currentUserId,
                  chatId,
                }) === "all" ? (
                  <p className="flex items-center justify-start text-sm text-gray-300 gap-1">
                    <BanIcon className="w-3 h-3" />
                    {chatDeletedOwnedLogic(deletedData as [], {
                      chatId,
                      senderId,
                      currentUserId,
                    }) && currentUserId === senderId
                      ? "Anda menghapus pesan ini"
                      : "Pesan ini telah dihapus"}
                  </p>
                ) : (
                  <p
                    className={`${findChatIndex(i) && message.length > 700 ? "line-clamp-none" : "line-clamp-6"} text-sm break-words`}
                  >
                    {linkify(message)}
                  </p>
                )}
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
                  <div className="flex items-center justify-end gap-1">
                    <p className="text-gray-300 text-[0.6rem]">
                      {new Date(createdAt).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <CheckCheckIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
                <span
                  className={`${senderId === currentUserId ? "self-end border-b-8 border-t-transparent border-l-8 border-l-blue-500 border-b-transparent -right-2" : "border-b-8 border-t-transparent border-r-8 border-r-[#303030] border-b-transparent -left-2"} absolute top-0 w-0 h-0`}
                ></span>
                {!isChatDeletedLogic(deletedData as [], {
                  currentUserId,
                  chatId,
                }) &&
                  reactions.length > 0 && (
                    <ReactionModal
                      currentUserId={currentUserId}
                      chatId={chatId}
                    />
                  )}
              </section>
              <ChatMenu
                open={showMenu === chatId}
                chatData={{
                  chatId,
                  alias:
                    alias && currentUserId === senderId ? "Anda" : alias.name,
                  message,
                }}
                position={menuPosition!}
                setPosition={setMenuPosition}
                onClose={() => setShowMenu("")}
                isChatDeleted={
                  isChatDeletedLogic(deletedData as [], {
                    currentUserId,
                    chatId,
                  }) !== null
                }
                isChatOwner={currentUserId === senderId}
              />
            </div>
          );
        }
      )}
      <div ref={bottomRef} />
    </div>
  );
}
