import { apiClient } from "shared/helpers/axios"
import type { FriendType } from "shared/types/friend-type"
import type { MemberType } from "shared/types/member-type"
import type { RoomType } from "shared/types/room-type"
import type { UserType } from "shared/types/user-type"

export const RoomService = {
    async createOrGetRoom(data: { userIdB: string }) {
        return await apiClient<{ data: { room: RoomType, member: MemberType[] } }>({ url: `/room/get-create/${data.userIdB}/get`, withCredentials: true })
    },
    async getCurrentUserRoom() {
        return await apiClient<{ statusCode: number, data: { room: RoomType, alias: FriendType | UserType | null }[] | [] }>({ url: '/room/current/get', withCredentials: true })
    },
    async getUserRoom() {
        return await apiClient<{ statusCode: number, data: { room: RoomType, alias: FriendType | UserType | null }[] | [] }>({ url: '/room/user/get', withCredentials: true })
    },
    async getRoomById(data: { roomId: string }) {
        return await apiClient<{ statusCode: number, data: { room: RoomType, alias: FriendType | UserType | null } }>({ url: `/room/${data.roomId}/get`, withCredentials: true })
    },
    async createPrivateRoom(data: { userIdB: string }) {
        return await apiClient<{ statusCode: number, data: RoomType }>({ url: "/room/private-room/post", data, withCredentials: true, method: "post" })
    }
}