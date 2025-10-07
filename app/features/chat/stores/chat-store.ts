import { create } from "zustand";

interface chatParentDataStore {
    parent: {
        parentId: string;
        content?: string | null;
        alias: string;
        message: string;
    };
    setParent: (parent: {
        parent: {
            parentId: string;
            content?: string | null;
            alias: string;
            message: string;
        }
    }) => void
    resetState: () => void
}

const initialState = {
    alias: "",
    parentId: "",
    message: "",
    content: null
}

export const useChatParentDataStore = create<chatParentDataStore>((set) => ({
    parent: initialState,
    setParent: ({ parent }) => set({ parent }),
    resetState: () => set({ parent: initialState })
}))