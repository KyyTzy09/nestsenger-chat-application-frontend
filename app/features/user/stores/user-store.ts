import type { UserType } from "shared/types/user-type";
import { create } from "zustand";

interface IUserStore {
    user: UserType | null,
    setUser: (user: UserType | null) => void
    resetState: () => void
}

export const useUserStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    resetState: () => set({ user: null })
}))