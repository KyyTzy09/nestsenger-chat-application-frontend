import { apiClient } from "shared/helpers/axios"
import type { FriendType } from "shared/types/friend-type"
import type { RoomType } from "shared/types/room-type"
import type { UserType } from "shared/types/user-type"

export const RoomService = {
    async getUserRoom() {
        return await apiClient<{ statusCode: number, data: { room: RoomType, alias: FriendType | UserType | null }[] | [] }>({ url: '/room/user/get', withCredentials: true })
    },
    async getRoomById(data: { roomId: string }) {
        return await apiClient<{ statusCode: number, data: { room: RoomType, alias: FriendType | UserType | null } }>({ url: `/room/${data.roomId}/get`, withCredentials: true })
    }
}