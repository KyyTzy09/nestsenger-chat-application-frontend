import type { RoomTypeEnum } from "shared/enums/room-type"
import type { MemberType } from "./member-type"

export type RoomType = {
    roomId: string
    roomName: string
    type: RoomTypeEnum
    member: MemberType[]

    createdAt: Date
    updatedAt: Date
}
