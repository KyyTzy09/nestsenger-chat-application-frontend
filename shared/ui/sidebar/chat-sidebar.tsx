import { SearchIcon } from "lucide-react";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";

export default function ChatSidebar() {
  return (
    <aside className="relative flex flex-col w-[30%] h-full bg-[#282828] py-9 px-5 text-white gap-5">
      <section className="flex flex-col w-full gap-10">
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
      <section className="flex flex-col w-full h-full">
      </section>
    </aside>
  );
}
