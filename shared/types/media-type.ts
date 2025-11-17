import type { ChatType } from "./chat-type"

export type ChatMediaType = {
    chatId: string
    mediaName: string
    mediaUrl: string
    mediaType: "image" | "video" | "audio" | "file"
    size: string
    createdAt: Date
    updatedAt: Date

    chat: ChatType
}
