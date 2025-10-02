import ChatCard from "~/features/chat/components/cards/chat-card";
import ChatForm from "~/features/chat/components/chat-form";
import ChatNavbar from "~/features/chat/components/chat-navbar";
import { useGetChats } from "~/features/chat/hooks/chat-hook";
import { useGetProfile } from "~/features/profile/hooks/profile-hook";
import { useGetRoomById } from "~/features/room/hooks/room-hooks";

interface ChatDetailPageProps {
  chatId: string;
}

export default function ChatDetailPage({ chatId }: ChatDetailPageProps) {
  const { data: roomInfoResponse, isPending: isRoomInfoLoading } = useGetRoomById({ roomId: chatId });
  const { data: chatResponse, isPending: isChatLoading } = useGetChats({ roomId: chatId })
  const { data: profileResponse } = useGetProfile()

  return (
    <div className="relative flex flex-col w-full h-screen max-h-screen bg-chat-pattern bg-black">
      {!isRoomInfoLoading && <ChatNavbar data={roomInfoResponse?.data!} />}
      <section className="w-full h-[85%] p-8 text-white overflow-y-scroll custom-scrollbar">
        <ChatCard userId={profileResponse?.data.userId!} data={chatResponse?.data!}/>
      </section>
      <section className="flex items-center justify-center w-full bg-[#252525] border border-black transition-all duration-200">
        <ChatForm roomId={chatId} />
      </section>
    </div>
  );
}
