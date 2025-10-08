import { RoomTypeEnum } from "shared/enums/room-type";
import PrivateChatCard from "~/features/chat/components/cards/private-chat-card";
import GroupChatCard from "~/features/chat/components/cards/group-chat-card";
import ChatForm from "~/features/chat/components/chat-form";
import ChatNavbar from "~/features/chat/components/chat-navbar";
import { useGetChats } from "~/features/chat/hooks/chat-hook";
import { useGetProfile } from "~/features/profile/hooks/profile-hook";
import { useGetRoomById } from "~/features/room/hooks/room-hooks";
import { useGetRoomMember } from "~/features/member/hooks/member-hook";
import { generateDateText } from "shared/helpers/generate-date";

interface ChatDetailPageProps {
  chatId: string;
}

export default function ChatDetailPage({ chatId }: ChatDetailPageProps) {
  const { data: roomInfoResponse, isPending: isRoomInfoLoading } =
    useGetRoomById({ roomId: chatId });
  const { data: chatResponse, isPending: isChatLoading } = useGetChats({
    roomId: chatId,
  });
  const { data: profileResponse } = useGetProfile();
  const { data: memberResponse } = useGetRoomMember({ roomId: chatId });

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
        {chatResponse?.data?.length! > 0 && chatResponse?.data.map(({ chats, date }) => {
            return (
              <div className="flex flex-col items-center w-full h-auto gap-5">
                <div className="flex items-center justify-center w-full">
                  <p className="flex items-center justify-center bg-[#232323] text-gray-400 font-semibold text-[12px] p-2 rounded-sm">
                    {generateDateText(date)}
                  </p>
                </div>
                {roomInfoResponse?.data?.room?.type === RoomTypeEnum.PRIVATE ? (
                  <PrivateChatCard
                    userId={profileResponse?.data.userId!}
                    data={chats}
                  />
                ) : (
                  <GroupChatCard
                    userId={profileResponse?.data.userId!}
                    data={chats}
                  />
                )}
              </div>
            );
          })}
      </section>
      <section className="flex items-center justify-center w-full bg-[#252525] border border-black transition-all duration-200">
        <ChatForm roomId={chatId} />
      </section>
    </div>
  );
}
