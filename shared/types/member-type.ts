import type { MemberRole } from "shared/enums/member-role"
import type { RoomType } from "./room-type"
import type { UserType } from "./user-type"


export type MemberType = {
    userId: string
    roomId: string
    role: MemberRole

    createdAt: Date
    updatedAt: Date

    room: RoomType
    user: UserType
}
