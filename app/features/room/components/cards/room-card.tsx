import React from "react";
import { defaultImage } from "shared/constants/image-default";

export default function RoomCard() {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      {Array.from({ length: 15 }).map((v, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-start w-full h-[70px] rounded-sm p-2 gap-2 hover:bg-[#45494f]"
          >
            <section className="w-[60px] h-full">
              <img
                src={defaultImage}
                alt="Default"
                className="w-full h-full object-cover rounded-full"
              />
            </section>
            <section className="flex flex-col items-center justify-start w-full h-full p-1">
              <div className="flex w-full items-center justify-between text-sm text-white font-semibold">
                <p>Nama Kontak/grup</p>
                <p className="text-[12px] font-normal">22.10</p>
              </div>
              <div className="flex items-center justify-start w-full text-[14px] text-gray-300 gap-1">
                <p>nama:</p>
                <p className="w-[40%] truncate">Haloo</p>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}
