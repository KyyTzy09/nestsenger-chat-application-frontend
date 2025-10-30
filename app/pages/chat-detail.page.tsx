import { RoomTypeEnum } from "shared/enums/room-type";
import PrivateChatCard from "~/features/chat/components/cards/private-chat-card";
import GroupChatCard from "~/features/chat/components/cards/group-chat-card";
import ChatForm from "~/features/chat/components/chat-form";
import ChatNavbar from "~/features/chat/components/chat-navbar";
import {
  useGetChats,
  useGetDeletedChats,
} from "~/features/chat/hooks/chat-hook";
import { useGetProfile } from "~/features/profile/hooks/profile-hook";
import { useGetRoomById } from "~/features/room/hooks/room-hooks";
import { useGetRoomMember } from "~/features/member/hooks/member-hook";
import { generateDateText } from "shared/helpers/generate-date";
import React from "react";
import { socket } from "shared/configs/socket";
import { useQueryClient } from "@tanstack/react-query";
import type { ChatType } from "shared/types/chat-type";
import type { ReactionType } from "shared/types/reaction-type";

interface ChatDetailPageProps {
  chatId: string;
}

export default function ChatDetailPage({ chatId }: ChatDetailPageProps) {
  const queryClient = useQueryClient();
  const { data: roomInfoResponse, isPending: isRoomInfoLoading } = useGetRoomById({ roomId: chatId });
  const { data: chatResponse } = useGetChats({ roomId: chatId });
  const { data: profileResponse } = useGetProfile();
  const { data: memberResponse } = useGetRoomMember({ roomId: chatId });
  const { data: deletedChatResponse } = useGetDeletedChats({ roomId: chatId });

  React.useEffect(() => {
    const handler = (newChat: ChatType) => {
      if (newChat.roomId) {
        queryClient.invalidateQueries({
          queryKey: ["chat", newChat.roomId],
          refetchType: "all",
        });
      }
    };
    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [queryClient, chatResponse?.data]);

  React.useEffect(() => {
    const handler = (reaction: ReactionType) => {
      if (reaction.chat) {
        queryClient.invalidateQueries({
          queryKey: ["chat", reaction.chat.roomId],
          refetchType: "all",
        });
        queryClient.invalidateQueries({
          queryKey: ["reaction", reaction.chatId],
          refetchType: "all",
        });
      }
    };
    socket.on("updateReaction", handler);
    return () => {
      socket.off("updateReaction", handler);
    };
  }, [queryClient]);

  React.useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries({
        queryKey: ["deleted-chats", chatId],
        refetchType: "all",
      });
    };
    socket.on("deletedChat", handler);
    return () => {
      socket.off("deletedChat", handler);
    };
  }, [queryClient]);

  return (
    <div className="relative flex flex-col w-full h-screen max-h-screen bg-chat-pattern bg-black">
      {!isRoomInfoLoading && (
        <ChatNavbar
          currentUserId={profileResponse?.data.userId || ""}
          roomInfo={roomInfoResponse?.data!}
          memberInfo={memberResponse?.data as []}
        />
      )}
      <section className="relative w-full h-[85%] p-8 text-white overflow-y-scroll custom-scrollbar">
        {chatResponse?.data?.length! > 0 &&
          chatResponse?.data?.map(({ chats, date }, i) => {
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
                    {roomInfoResponse?.data?.room?.type ===
                    RoomTypeEnum.PRIVATE ? (
                      <PrivateChatCard
                        deletedData={deletedChatResponse?.data}
                        currentUserId={profileResponse?.data.userId!}
                        data={chats}
                      />
                    ) : (
                      <GroupChatCard
                        deletedData={deletedChatResponse?.data}
                        currentUserId={profileResponse?.data.userId!}
                        data={chats}
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </section>
      <section className="flex items-center justify-center w-full bg-[#252525] border border-black transition-all duration-200">
        <ChatForm roomId={chatId} />
      </section>
    </div>
  );
}
