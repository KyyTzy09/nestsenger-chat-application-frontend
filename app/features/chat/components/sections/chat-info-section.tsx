import { CheckCheckIcon } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";

export default function ChatInfoSection({}) {
  const infoContents = [
    {
      title: "Read by",
      text: "Dibaca Oleh",
      Icon: <CheckCheckIcon className="w-4 h-4 text-blue-500" />,
      data: Array.from({ length: 5 }),
    },
    {
      title: "send to",
      text: "Terkirim",
      Icon: <CheckCheckIcon className="w-4 h-4" />,
      data: Array.from({ length: 5 }),
    },
  ];

  return (
    <section className="flex flex-col items-center justify-start w-full h-full max-h-72 p-2 overflow-y-scroll custom-scroll gap-2">
      {infoContents.map(({ title, text, Icon, data }) => {
        return (
          <React.Fragment key={title}>
            {data?.length > 0 && (
              <div className="flex flex-col w-full gap-2">
                <p className="flex items-center justify-start text-sm gap-2 px-1">
                  {Icon}
                  {text}
                </p>
                <div className="grid grid-cols-1 w-full gap-1">
                  {data?.map((v, i) => {
                    return (
                      <div
                        className="flex items-center w-full h-8 justify-between text-[12px] rounded-sm"
                        key={i}
                      >
                        <section className="flex items-center justify-start gap-2">
                          <img
                            className="w-5 h-5 rounded-full"
                            src={defaultImage}
                            alt="Read Chat"
                          />
                          <p className="line-clamp-1">Nama Pengguna</p>
                        </section>
                        <p className="flex gap-1">
                          {new Date().toLocaleString("id-ID", {
                            dateStyle: "medium",
                          })}
                          {", "}
                          {new Date().toLocaleTimeString("id-ID", {
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </section>
  );
}
