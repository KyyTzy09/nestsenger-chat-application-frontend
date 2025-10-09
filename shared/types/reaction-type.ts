import type { ChatType } from "./chat-type"
import type { UserType } from "./user-type"

export type ReactionType = {
    reaction: string
    content: string
    createdAt: Date
    updatedAt: Date

    userId: string
    chatId: string
    user: UserType
    chat: ChatType
}
