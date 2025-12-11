import type React from "react"
import { create } from "zustand"

interface IStatusData {
    file: File
    fileUrl: string
    fileType: "image" | "video" | "audio" | "file"
}

interface ICreateStatusStore {
    openModal: boolean
    setOpenModal: (open: boolean) => void
    status: IStatusData[] | null
    setChat: React.Dispatch<React.SetStateAction<IStatusData[] | null>>
    resetState: () => void
}

const initialState = {
    status: null,
    openModal: false,
}

export const useCreateStatusStore = create<ICreateStatusStore>((set) => ({
    openModal: false,
    status: null,
    setOpenModal: (value: boolean) => set({ openModal: value }),
    setChat: (status) => set({ status: status as [] }),
    resetState: () => set(initialState)
}))