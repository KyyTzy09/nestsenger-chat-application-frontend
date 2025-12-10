import type { AliasType } from "shared/types/alias-type";
import type { StatusType } from "shared/types/status-type";
import { create } from "zustand";

interface IStatusPreviewStore {
    openPreview: boolean
    data: { statuses: StatusType[], alias: AliasType } | null,
    statusId: string | null,
    setOpenPreview: (open: boolean) => void
    setStatus: (data: { statuses: StatusType[], alias: AliasType }) => void,
    setStatusId: (statusId: string) => void
    resetState: () => void
}

export const useStatusPreviewStore = create<IStatusPreviewStore>((set,) => ({
    openPreview: false,
    data: null,
    statusId: null,
    setOpenPreview: (open) => set({ openPreview: open }),
    setStatusId: (statusId) => set({ statusId }),
    setStatus: (data) => set({ data }),
    resetState: () => set({ data: null, statusId: null, openPreview: false }),
}))