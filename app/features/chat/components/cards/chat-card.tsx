import React from "react";

export default function ChatCard() {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-3">
      {Array.from({ length: 25 }).map((v, i) => {
        return (
          <div
            className={`${i % 2 === 0 ? "self-start bg-[#303030]" : "self-end bg-blue-500"} w-1/3 h-full text-white p-2 break-all rounded-sm`}
            key={i}
          >
            <div>{i} Anomali</div>
          </div>
        );
      })}
    </div>
  );
}
