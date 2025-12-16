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
import type { RoomType } from "shared/types/room-type";
import type { UserType } from "shared/types/user-type";
import type { FriendType } from "shared/types/friend-type";

interface ChatDetailPageProps {
  roomId: string;
}

export default function ChatDetailPage({ roomId }: ChatDetailPageProps) {
  // Instance
  const queryClient = useQueryClient();

  // Query
  const { data: roomInfoResponse } = useGetRoomById({ roomId });
  const { data: chatResponse } = useGetChats({ roomId });
  const { data: memberResponse } = useGetRoomMember({ roomId });
  const { data: deletedChatResponse } = useGetDeletedChats({ roomId });
  const { data: media } = useGetNonFileMedia({ roomId });
  const { data: reactionsResponse } = useGetChatReactionsByRoomId({ roomId });
  const { data: readChatsResponse } = useGetReadChatsByRoomId({ roomId });

  // Store
  const { user } = useUserStore();

  // Params
  const params = {
    roomData: roomInfoResponse?.data!,
    chatsData: chatResponse?.data as [],
    reactionsData: reactionsResponse?.data as [],
    readerChatsData: readChatsResponse?.data as [],
    deletedChatsData: deletedChatResponse?.data as [],
    currentUserId: user?.userId || "",
  };

  // Handler Event
  React.useEffect(() => {
    const handler = async () => {
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
    };

    socket.on(`room:refresh-${roomId}`, handler);
    return () => {
      socket.off(`room:refresh-${roomId}`, handler);
    };
  });

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

    socket.on("chat:new", handler);

    return () => {
      socket.off("chat:new", handler);
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
    socket.on("reaction:update", handler);
    return () => {
      socket.off("reaction:update", handler);
    };
  }, [queryClient]);

  React.useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries({
        queryKey: ["deleted-chats", roomId],
        refetchType: "all",
      });
    };
    socket.on("chat:delete", handler);
    return () => {
      socket.off("chat:delete", handler);
    };
  }, [queryClient]);

  React.useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries({
        queryKey: ["read-chats-room", roomId],
        refetchType: "all",
      });
    };

    socket.on("readchat:update", handler);
    return () => {
      socket.off("readchat:update", handler);
    };
  }, [queryClient]);

  return (
    <div className="relative flex flex-col w-full h-screen max-h-screen bg-chat-pattern bg-black">
      <ChatMediaForm />
      <ChatNavbar
        currentUserId={user?.userId || ""}
        roomInfo={roomInfoResponse?.data!}
        memberInfo={memberResponse?.data as []}
        media={media?.data as []}
      />
      <ChatSection {...params} />
      <section className="flex items-center justify-center w-full bg-[#252525] border border-black transition-all duration-200">
        <ChatForm roomId={roomId} />
      </section>
    </div>
  );
}
