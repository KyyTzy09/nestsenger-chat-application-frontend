import { create } from "zustand"

interface IMediaPreviewStore {
    chatId: string | null
    openPreview: boolean
    setOpenPreview: (open: boolean) => void
    setChatId: (mediaId: string | null) => void
    resetState: () => void
}

export const useMediaPreviewStore = create<IMediaPreviewStore>((set) => ({
    chatId: null,
    openPreview: false,
    setChatId: (chatId: string | null) => set({ chatId }),
    setOpenPreview: (open: boolean) => set({ openPreview: open }),
    resetState: () => set({ chatId: "" })
}))