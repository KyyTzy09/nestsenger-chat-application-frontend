import { create } from "zustand"

interface IChatData {
    file: File,
    message: string,
    parent?: {
        parentId: string
    }
}

interface ICreateMediaStore {
    openModal: boolean
    setOpenModal: (open: boolean) => void
    chat: IChatData[] | null
    setChats: (chat: IChatData[]) => void
}

export const useCreateMediaStore = create<ICreateMediaStore>((set) => ({
    openModal: false,
    chat: null,
    setOpenModal: (value: boolean) => set({ openModal: value }),
    setChats: (chat: IChatData[]) => set({ chat })
}))