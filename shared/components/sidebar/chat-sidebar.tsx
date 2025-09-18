import { SearchIcon } from "lucide-react";
import { defaultImage } from "shared/constants/image-default";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import { Sidebar, SidebarContent } from "shared/shadcn/sidebar";
import ChatCard from "~/features/chat/components/cards/chat-card";

export default function ChatSidebar() {
  return (
    <aside className="relative z-0 flex flex-col w-[30%] h-screen bg-[#282828] pt-10 text-white gap-3">
      <section className="relative flex flex-col items-start justify-center w-full h-[15%] gap-8 px-5">
        <Label className="text-white font-semibold text-lg">Chats</Label>
        <div className="relative flex w-full h-full">
          <Input
            className="flex w-full bg-[#404040] border-blue-600 border-b-2 border-t-0 border-x-0 pl-8"
            placeholder="Cari chat atau mulai chat baru"
          />
          <div className="absolute top-0 left-0 flex items-center justify-center w-6 h-full pl-2">
            <SearchIcon className="w-4 h-full" />
          </div>
        </div>
      </section>
      <section className="flex w-full h-[90%] overflow-y-auto px-1">
        <ChatCard />
      </section>
    </aside>
  );
}
