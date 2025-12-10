import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { generateDateText2 } from "shared/helpers/generate-date";
import type { StatusType } from "shared/types/status-type";
import StatusRing from "../status-ring";

interface StatusCardProps {
  userName: string;
  createdDate: Date;
  imageUrl: string;
  statusLength: number;
}

export default function StatusCard({
  userName,
  imageUrl,
  createdDate,
  statusLength,
}: StatusCardProps) {
  return (
    <main className="flex items-center justify-start w-full h-16 gap-3 hover:bg-[#45494f] px-5 rounded-md">
      <StatusRing
        count={statusLength}
        className="flex items-center justify-center w-14 h-14 rounded-full"
      >
        <img
          src={imageUrl || defaultImage}
          alt={defaultImage}
          className="w-full h-full object-cover rounded-full"
        />
      </StatusRing>
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
  );
}
