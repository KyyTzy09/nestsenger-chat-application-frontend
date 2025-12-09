import { RoomTypeEnum } from "shared/enums/room-type";
import PrivateChatCard from "~/features/chat/components/cards/private-chat-card";
import GroupChatCard from "~/features/chat/components/cards/group-chat-card";
import ChatForm from "~/features/chat/components/forms/chat-form";
import ChatNavbar from "~/features/room/components/room-navbar";
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
import { ReadChatService } from "~/features/chat/services/readchat-service";
import { toast } from "sonner";
import ChatSection from "~/features/chat/components/sections/chat-section";
import ChatMediaForm from "~/features/chat/components/forms/chat-media-form";
import { useUserStore } from "~/features/user/stores/user-store";
import { useGetNonFileMedia } from "~/features/chat/hooks/chat-media-hook";
import { useGetChatReactionsByRoomId } from "~/features/reaction/hooks/reaction-hook";
import { useGetReadChatsByRoomId } from "~/features/chat/hooks/readchat-hook";

interface ChatDetailPageProps {
  roomId: string;
}

export default function ChatDetailPage({ roomId }: ChatDetailPageProps) {
  const queryClient = useQueryClient();
  const { data: roomInfoResponse, isPending: isRoomInfoLoading } =
    useGetRoomById({ roomId });
  const { data: chatResponse } = useGetChats({ roomId });
  const { data: memberResponse } = useGetRoomMember({ roomId });
  const { data: deletedChatResponse } = useGetDeletedChats({ roomId });
  const { data: media } = useGetNonFileMedia({ roomId });
  const { data: reactionsResponse } = useGetChatReactionsByRoomId({ roomId });
  const { data: readChatsResponse } = useGetReadChatsByRoomId({ roomId });
  const { user } = useUserStore();

  const params = {
    roomData: roomInfoResponse?.data!,
    chatsData: chatResponse?.data as [],
    reactionsData: reactionsResponse?.data as [],
    readerChatsData: readChatsResponse?.data as [],
    deletedChatsData: deletedChatResponse?.data as [],
    currentUserId: user?.userId || "",
  };

  // roomData={roomInfoResponse?.data!}
  //       chatsData={chatResponse?.data as []}
  //       reactionsData={reactionsResponse?.data as []}
  //       deletedChatsData={deletedChatResponse?.data as []}
  //       currentUserId={user?.userId || ""}
  React.useEffect(() => {
    const handler = async (newChat: ChatType) => {
      if (newChat.roomId) {
        if (newChat.userId !== user?.userId) {
          await ReadChatService.readChat({ roomId: roomId });
        }
        queryClient.invalidateQueries({
          queryKey: ["chat", newChat.roomId],
          refetchType: "all",
        });
        queryClient.invalidateQueries({
          queryKey: ["media-non-file", newChat.roomId],
          refetchType: "all",
        });
      }
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [queryClient]);

  React.useEffect(() => {
    const handler = (reaction: ReactionType) => {
      if (reaction.chat) {
        queryClient.invalidateQueries({
          queryKey: ["chat", reaction.chat.roomId],
          refetchType: "all",
        });
        queryClient.invalidateQueries({
          queryKey: ["reactions-room", roomId],
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
        queryKey: ["deleted-chats", roomId],
        refetchType: "all",
      });
    };
    socket.on("deletedChat", handler);
    return () => {
      socket.off("deletedChat", handler);
    };
  }, [queryClient]);

  React.useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries({
        queryKey: ["read-chats-room", roomId],
        refetchType: "all",
      });
    };

    socket.on("readChatUpdate", handler);
    return () => {
      socket.off("readChatUpdate", handler);
    };
  }, [queryClient]);

  return (
    <div className="relative flex flex-col w-full h-screen max-h-screen bg-chat-pattern bg-black">
      <ChatMediaForm />
      {!isRoomInfoLoading && (
        <ChatNavbar
          currentUserId={user?.userId || ""}
          roomInfo={roomInfoResponse?.data!}
          memberInfo={memberResponse?.data as []}
          media={media?.data as []}
        />
      )}
      <ChatSection {...params} />
      <section className="flex items-center justify-center w-full bg-[#252525] border border-black transition-all duration-200">
        <ChatForm roomId={roomId} />
      </section>
    </div>
  );
}
