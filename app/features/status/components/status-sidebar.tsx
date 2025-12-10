import { TimerIcon } from "lucide-react";
import { Label } from "shared/shadcn/label";
import { useGetTodayStatuses } from "../hooks/status-hook";
import StatusCard from "./cards/status-card";

export default function StatusSidebar() {
  const { data: statusesTodayResponse } = useGetTodayStatuses();
  return (
    <aside className="relative z-0 flex flex-col w-full h-full bg-[#252525] pt-10 text-white gap-2">
      <div className="flex items-center justify-between w-full px-5">
        <Label className="text-white font-semibold text-lg">Status</Label>
      </div>
      <div className="flex flex-col items-center justify-start w-full h-full overflow-y-scroll custom-scrollbar">
        <section className="relative flex flex-col items-start justify-center w-full h-[14%] gap-6 px-5 ">
          <StatusCard
            userName="Status Anda"
            createdDate={new Date()}
            imageUrl="https://i.pinimg.com/736x/55/f6/27/55f62793829b337449ff9b0b8ee3aed0.jpg"
          />
        </section>
        <section className="flex flex-col w-full h-[90%] px-5 gap-2">
          <Label className="flex items-center justify-start text-gray-300 text-sm gap-1">
            <TimerIcon className="w-[14px] h-[14px]" />
            Pembaruan Terkini
          </Label>
          <div className="flex flex-col w-full h-full gap-2">
            {statusesTodayResponse?.data?.map(({ alias, statuses }, i) => {
              return (
                <StatusCard
                  key={i}
                  userName={alias.alias}
                  createdDate={statuses[statuses.length - 1].createdAt}
                  imageUrl={alias.avatar}
                />
              );
            })}
          </div>
        </section>
      </div>
    </aside>
  );
}
