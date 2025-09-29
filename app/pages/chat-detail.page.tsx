import ChatNavbar from "~/features/chat/components/chat-navbar";
import { useGetRoomById } from "~/features/room/hooks/room-hooks";

interface ChatDetailPageProps {
  chatId: string;
}

export default function ChatDetailPage({ chatId }: ChatDetailPageProps) {
  const { data: roomInfoResponse, isPending: isRoomInfoLoading } =
    useGetRoomById({ roomId: chatId });
  return (
    <div className="relative flex flex-col  w-full h-screen">
      {!isRoomInfoLoading && <ChatNavbar data={roomInfoResponse?.data!} />}
      <section className="w-full h-full p-5">
        <p>{chatId}</p>
      </section>
    </div>
  );
}
