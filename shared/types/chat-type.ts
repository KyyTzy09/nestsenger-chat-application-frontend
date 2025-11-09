import type { ChatMediaType } from "./media-type"
import type { ReactionType } from "./reaction-type"
import type { RoomType } from "./room-type"
import type { UserType } from "./user-type"

export type ChatType = {
    chatId: string

    userId: string
    roomId: string
    parentId: string
    message: string
    createdAt: Date
    updatedAt: Date

    parent: ChatType
    media: ChatMediaType
    replies: ChatType[]
    sender: UserType
    room: RoomType
    lastChatOf: RoomType[]
    reactions: ReactionType[]
}
