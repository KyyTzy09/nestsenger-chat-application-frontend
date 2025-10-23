import type { DeletedChatTypeEnum } from "shared/enums/deleted-type"
import type { ChatType } from "./chat-type"
import type { UserType } from "./user-type"

export type DeletedChatType = {
    userId: string
    chatId: string
    type: DeletedChatTypeEnum
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date

    user: UserType
    chat: ChatType
}