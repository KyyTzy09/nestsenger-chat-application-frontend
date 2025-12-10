import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { generateDateText2 } from "shared/helpers/generate-date";
import type { StatusType } from "shared/types/status-type";

interface StatusCardProps {
  userName: string;
  createdDate: Date;
  imageUrl: string;
}

export default function StatusCard({
  userName,
  imageUrl,
  createdDate,
}: StatusCardProps) {
  return (
    <div className="relative flex w-full h-full">
      <main className="flex items-center justify-start w-full h-16 gap-3">
        <section className="w-14 h-14 border-[3px] border-blue-500 rounded-full">
          <img
            src={imageUrl || defaultImage}
            alt={defaultImage}
            className="w-full h-full object-cover rounded-full"
          />
        </section>
        <section className="flex flex-col items-start justify-center h-full text-white">
          <p className="font-semibold text-[14px]">{userName}</p>
          <p className="text-sm">
            {generateDateText2({ date: new Date(createdDate) })}
            {", "}
            {new Date(createdDate).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </section>
      </main>
    </div>
  );
}
