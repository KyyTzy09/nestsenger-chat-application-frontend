import type React from "react"
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
    setChats: React.Dispatch<React.SetStateAction<IChatData[] | null>>
}

export const useCreateMediaStore = create<ICreateMediaStore>((set) => ({
    openModal: false,
    chat: null,
    setOpenModal: (value: boolean) => set({ openModal: value }),
    setChats: (value) => set((state) => ({
        chat: typeof value === "function" ? value(state.chat) : value
    }))
}))