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
    statuses: IStatusData[] | null
    setStatuses: React.Dispatch<React.SetStateAction<IStatusData[] | null>>
    resetState: () => void
}

const initialState = {
    statuses: null,
    openModal: false,
}

export const useCreateStatusStore = create<ICreateStatusStore>((set) => ({
    openModal: false,
    statuses: null,
    setOpenModal: (value: boolean) => set({ openModal: value }),
    setStatuses: (statuses) => set({ statuses: statuses as [] }),
    resetState: () => set(initialState)
}))