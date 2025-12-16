import React from "react";
import { generateDateText } from "shared/helpers/generate-date";
import type { AliasType } from "shared/types/alias-type";
import type { ChatType } from "shared/types/chat-type";
import type { FriendType } from "shared/types/friend-type";
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import PrivateChatCard from "../cards/private-chat-card";
import type { DeletedChatType } from "shared/types/deleted-chat";
import { RoomTypeEnum } from "shared/enums/room-type";
import GroupChatCard from "../cards/group-chat-card";
import type { ReactionType } from "shared/types/reaction-type";
import type { ReadChatType } from "shared/types/readchat-type";

interface ChatSectionProps {
  chatsData: { date: string; chats: { chat: ChatType; user: AliasType }[] }[];
  reactionsData: { reaction: ReactionType; user: AliasType }[];
  readerChatsData: { readChat: ReadChatType; alias: AliasType }[];
  deletedChatsData: DeletedChatType[];
  roomData: { room: RoomType; user: AliasType | null };
  currentUserId: string;
}

export default function ChatSection({
  chatsData,
  roomData,
  reactionsData,
  readerChatsData,
  deletedChatsData,
  currentUserId,
}: ChatSectionProps) {
  return (
    <section className="relative w-full h-[85%] p-8 text-white overflow-y-scroll custom-scrollbar">
      {chatsData?.length > 0 &&
        chatsData?.map(({ chats, date }, i) => {
          return (
            <React.Fragment key={i}>
              {chats?.length > 0 && (
                <div
                  key={i}
                  className="flex flex-col items-center w-full h-auto gap-5"
                >
                  <div className="flex items-center justify-center w-full">
                    <p className="flex items-center justify-center bg-[#232323] text-gray-400 font-semibold text-[12px] p-2 rounded-sm">
                      {generateDateText(date)}
                    </p>
                  </div>
                  {roomData?.room?.type === RoomTypeEnum.PRIVATE ? (
                    <PrivateChatCard
                      readersData={readerChatsData}
                      reactionsData={reactionsData}
                      deletedData={deletedChatsData}
                      currentUserId={currentUserId}
                      chatsData={chats as []}
                    />
                  ) : (
                    <GroupChatCard
                      deletedData={deletedChatsData}
                      currentUserId={currentUserId}
                      chatsData={chats}
                      reactionsData={reactionsData}
                      readersData={readerChatsData}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
    </section>
  );
}
