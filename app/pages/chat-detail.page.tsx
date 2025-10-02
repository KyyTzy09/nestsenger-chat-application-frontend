import ChatForm from "~/features/chat/components/chat-form";
import ChatNavbar from "~/features/chat/components/chat-navbar";
import { useGetRoomById } from "~/features/room/hooks/room-hooks";

interface ChatDetailPageProps {
  chatId: string;
}

export default function ChatDetailPage({ chatId }: ChatDetailPageProps) {
  const { data: roomInfoResponse, isPending: isRoomInfoLoading } = useGetRoomById({ roomId: chatId });

  return (
    <div className="relative flex flex-col  w-full h-screen max-h-screen bg-chat-pattern bg-black">
      {!isRoomInfoLoading && <ChatNavbar data={roomInfoResponse?.data!} />}
      <section className="w-full h-full p-5 text-white overflow-hidden">
        <p>{chatId}</p>
      </section>
      <section className="flex items-center justify-center w-full bg-[#252525] border border-black transition-all duration-200">
        <ChatForm roomId={chatId} />
      </section>
    </div>
  );
}
