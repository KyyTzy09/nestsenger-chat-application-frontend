import type { ChatType } from "./chat-type"
import type { MemberType } from "./member-type"

export type ReadChatType = {
    chatReadId: string
    chatId: string
    readerId: string
    isRead: boolean

    sendAt: Date
    readAt: Date

    chat: ChatType
    reader: MemberType
}
