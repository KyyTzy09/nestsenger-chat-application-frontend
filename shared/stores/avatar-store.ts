import type React from "react"
import { create } from "zustand"

interface updateAvatarStore {
    showDialog: boolean
    avatar: string | null
    setShowDialog: (show: boolean) => void
    setAvatar: (image: string | null) => void
}

export const useUpdateAvatarStore = create<updateAvatarStore>((set) => ({
    avatar: null,
    showDialog: false,
    setAvatar: (avatar) => set({ avatar: avatar }),
    setShowDialog: (isOpen) => set({ showDialog: isOpen })
}))