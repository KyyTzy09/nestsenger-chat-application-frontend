import type { ChatMediaType } from "shared/types/media-type";
import { create } from "zustand";

interface chatParentDataStore {
    parent: {
        parentId: string;
        media?: ChatMediaType | null
        alias: string;
        message: string;
    };
    setParent: (parent: {
        parent: {
            parentId: string;
            alias: string;
            media?: ChatMediaType | null
            message: string;
        }
    }) => void
    resetState: () => void
}

const initialState = {
    alias: "",
    parentId: "",
    message: "",
    media: null,
    content: null
}

export const useChatParentDataStore = create<chatParentDataStore>((set) => ({
    parent: initialState,
    setParent: ({ parent }) => set({ parent }),
    resetState: () => set({ parent: initialState })
}))