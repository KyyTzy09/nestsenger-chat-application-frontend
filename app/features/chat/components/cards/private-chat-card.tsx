import React from "react";
import { linkify } from "shared/helpers/linkify";
import type { ChatType } from "shared/types/chat-type";
import type { FriendType } from "shared/types/friend-type";
import type { UserType } from "shared/types/user-type";
import ChatParentSection from "../sections/chat-parent-section";
import ChatMenu from "../chat-menu";
import ReactionModal from "~/features/reaction/components/reaction-modal";
import type { DeletedChatType } from "shared/types/deleted-chat";
import { DeletedChatTypeEnum } from "shared/enums/deleted-type";
import { BanIcon } from "lucide-react";
import type { AliasType } from "shared/types/alias-type";

interface PrivateChatCardProps {
  data: { chat: ChatType; alias: AliasType }[] | [];
  deletedData?: DeletedChatType[];
  currentUserId: string;
}

export default function PrivateChatCard({
  data,
  deletedData,
  currentUserId,
}: PrivateChatCardProps) {
  const prevChatLength = React.useRef<number>(0);
  // Handle Deleted Chat
  function isChatDeleted(chatId: string) {
    const isSelfDeletedChat = deletedData?.some(
      ({ chatId: deletedChatId, type, userId }) => {
        return (
          deletedChatId === chatId &&
          userId === currentUserId &&
          type === DeletedChatTypeEnum.SELF
        );
      }
    );

    const isAllDeletedChat = deletedData?.some(
      ({ chatId: deletedChatId, type }) => {
        return deletedChatId === chatId && type === DeletedChatTypeEnum.ALL;
      }
    );

    if (isSelfDeletedChat) {
      return "self";
    } else if (isAllDeletedChat) {
      return "all";
    } else {
      return null;
    }
  }

  function chatDeletedOwned(chatId: string, senderId: string): boolean {
    return (
      deletedData?.some(
        ({ chatId: deletedChatId }) =>
          senderId === currentUserId && chatId === deletedChatId
      ) ?? false
    );
  }

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

  // Expand Chat feature handle
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
            <>
              {isChatDeleted(chatId) !== "self" && (
                <div
                  key={chatId}
                  className={`${senderId === currentUserId ? "justify-end" : "justify-start"} flex items-center relative w-full h-auto ${!isChatDeleted(chatId) && reactions?.length > 0 ? "mb-5" : "mb-0"}`}
                >
                  <div
                    onContextMenu={(e) => handleShowContextMenu(e, chatId)}
                    className={`${senderId === currentUserId ? "self-end bg-blue-500 rounded-tr-none" : "self-start bg-[#303030] rounded-tl-none"} relative flex flex-col max-w-[55%] min-w-[120px] h-auto text-white p-2 rounded-sm gap-1 shadow`}
                  >
                    {!isChatDeleted(chatId) && parent && (
                      <ChatParentSection
                        currentUserId={currentUserId}
                        chatId={chatId}
                      />
                    )}
                    {isChatDeleted(chatId) === "all" ? (
                      <p className="flex items-center justify-start text-sm text-gray-300 gap-1">
                        <BanIcon className="w-3 h-3" />
                        {chatDeletedOwned(chatId, senderId)
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
                      <p className="text-gray-300 text-[0.6rem]">
                        {new Date(createdAt).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span
                      className={`${senderId === currentUserId ? "self-end border-b-8 border-t-transparent border-l-8 border-l-blue-500 border-b-transparent -right-2" : "border-b-8 border-t-transparent border-r-8 border-r-[#303030] border-b-transparent -left-2"} absolute top-0 w-0 h-0`}
                    ></span>
                    {!isChatDeleted(chatId) && reactions?.length > 0 && (
                      <ReactionModal
                        currentUserId={currentUserId}
                        chatId={chatId}
                      />
                    )}
                  </div>
                  <ChatMenu
                    open={showMenu === chatId}
                    chatData={{
                      chatId,
                      alias: currentUserId === senderId ? "Anda" : alias.name,
                      message,
                    }}
                    position={menuPosition!}
                    setPosition={setMenuPosition}
                    onClose={() => setShowMenu("")}
                    isChatDeleted={isChatDeleted(chatId) !== null}
                    isChatOwner={currentUserId === senderId}
                  />
                </div>
              )}
            </>
          );
        }
      )}
      <div ref={bottomRef} />
    </div>
  );
}
