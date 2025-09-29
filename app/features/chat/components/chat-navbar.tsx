import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { Label } from "shared/shadcn/label";

interface ChatNavbarProps {}

export default function ChatNavbar({}: ChatNavbarProps) {
  return (
    <nav className="flex items-center justify-between w-full h-[70px] bg-[#252525] border border-black p-5">
      <section className="flex items-center justify-start h-full max-w-[80%] gap-5">
        <div className="w-10 h-10">
          <img
            src={defaultImage}
            alt="yaya"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="flex flex-col font-semibold text-white">
          <Label className="">Nama Kontak</Label>
          <Label className="text-[10px] text-gray-300 font-normal">Klik untuk info kontak</Label>
        </div>
      </section>
    </nav>
  );
}
