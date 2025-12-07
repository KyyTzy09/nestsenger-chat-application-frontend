import type { RoomTypeEnum } from "shared/enums/room-type"
import type { MemberType } from "./member-type"
import type { ChatType } from "./chat-type"

export type RoomType = {
    roomId: string
    roomName: string
    description: string | null
    avatar: string
    type: RoomTypeEnum
    members: MemberType[]
    lastChat: ChatType
    createdAt: Date
    updatedAt: Date
}
