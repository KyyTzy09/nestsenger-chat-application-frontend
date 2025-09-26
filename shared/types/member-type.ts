import type { RoomType } from "./room-type"
import type { UserType } from "./user-type"


export type MemberType = {
    userId: string
    roomId: string

    createdAt: Date
    updatedAt: Date

    room: RoomType
    user: UserType
}
