import type { ChatType } from "./chat-type"

export type ChatMediaType = {
    chatId: string
    mediaName: string
    mediaUrl: string
    size: string
    createdAt: Date
    updatedAt: Date

    chat: ChatType
}
