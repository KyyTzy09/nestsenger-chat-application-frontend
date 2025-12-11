import { CircleDotDashedIcon, PlusIcon, TimerIcon } from "lucide-react";
import { Label } from "shared/shadcn/label";
import {
  useGetTodayStatuses,
  useGetTodayUserStatuses,
} from "../hooks/status-hook";
import StatusCard from "./cards/status-card";
import { useStatusPreviewStore } from "../stores/status-store";
import CreateStatusTrigger from "./create-status-trigger";

export default function StatusSidebar() {
  const { data: statusesTodayResponse } = useGetTodayStatuses();
  const { data: statusesUserResponse } = useGetTodayUserStatuses();
  const { setStatusId, setOpenPreview, setStatus } = useStatusPreviewStore();

  return (
    <aside className="relative z-0 flex flex-col w-full h-full bg-[#252525] pt-10 text-white">
      <div className="flex items-center justify-between w-full px-5">
        <Label className="text-white font-semibold text-lg">Status</Label>
      </div>
      <div className="flex flex-col items-center justify-start w-full h-full overflow-y-scroll custom-scrollbar">
        <section className="relative flex flex-col items-start justify-center w-full h-[14%] gap-6 px-1">
          <div className="flex items-center justify-start w-full h-full">
            {statusesUserResponse?.data.statuses.length! > 0 ? (
              <StatusCard
                action={() => {
                  setStatus(statusesUserResponse?.data!);
                  setStatusId(
                    statusesUserResponse?.data?.statuses[
                      statusesUserResponse?.data?.statuses?.length - 1
                    ].statusId || ""
                  );
                  setOpenPreview(true);
                }}
                statusLength={statusesUserResponse?.data?.statuses?.length || 0}
                userName={"Status Anda"}
                createdDate={
                  statusesUserResponse?.data?.statuses[
                    statusesUserResponse?.data?.statuses?.length - 1
                  ]?.createdAt!
                }
                imageUrl={statusesUserResponse?.data?.alias?.avatar || ""}
              />
            ) : (
              <CreateStatusTrigger />
            )}
          </div>
        </section>
        <section className="flex flex-col w-full h-[90%] gap-2">
          <Label className="flex items-center justify-start text-gray-300 text-sm gap-1 px-5">
            <TimerIcon className="w-[14px] h-[14px]" />
            Pembaruan Terkini
          </Label>
          <div className="flex flex-col w-full h-full gap-2 px-1">
            {statusesTodayResponse?.data.length! > 0 ? (
              statusesTodayResponse?.data?.map((data, i) => {
                return (
                  <StatusCard
                    key={i}
                    action={() => {
                      setStatus(data);
                      setStatusId(
                        data.statuses[data.statuses.length - 1].statusId
                      );
                      setOpenPreview(true);
                    }}
                    userName={data.alias.alias}
                    createdDate={
                      data.statuses[data.statuses.length - 1].createdAt
                    }
                    imageUrl={data.alias.avatar}
                    statusLength={data.statuses.length}
                  />
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                <CircleDotDashedIcon
                  className="w-12 h-12 text-blue-500"
                  strokeWidth={2.5}
                />
                <p className="text-gray-300 text-sm">
                  Tidak Ada Status Tersedia
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </aside>
  );
}
