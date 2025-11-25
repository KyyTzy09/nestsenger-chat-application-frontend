import type React from "react"
import { create } from "zustand"

interface IChatData {
    file: File,
    fileUrl: string
    parent?: {
        parentId: string
    }
}

interface ICreateMediaStore {
    openModal: boolean
    setOpenModal: (open: boolean) => void
    chat: IChatData | null
    // setChats: React.Dispatch<React.SetStateAction<IChatData[] | null>>
    setChat: (chat: IChatData) => void
}

const initialState = {
    chat: null,
    openModal: false,
}

export const useCreateMediaStore = create<ICreateMediaStore>((set) => ({
    openModal: false,
    chat: null,
    setOpenModal: (value: boolean) => set({ openModal: value }),
    setChat: (chat) => set({ chat }),
    resetState: () => set(initialState)
}))