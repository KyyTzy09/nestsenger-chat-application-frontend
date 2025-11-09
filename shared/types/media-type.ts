import type { ChatType } from "./chat-type"

export type ChatMediaType = {
    chatId: string
    mediaUrl: string
    createdAt: Date
    updatedAt: Date

    chat: ChatType
}
