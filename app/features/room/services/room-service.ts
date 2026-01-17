import { apiClient } from "shared/helpers/axios"
import type { AliasType } from "shared/types/alias-type"
import type { FriendType } from "shared/types/friend-type"
import type { MemberType } from "shared/types/member-type"
import type { RoomType } from "shared/types/room-type"
import type { UserType } from "shared/types/user-type"

export const RoomService = {
    async createOrGetRoom(data: { userIdB: string }) {
        return await apiClient<{ data: { room: RoomType, member: MemberType[] } }>({ url: `/room/get-create/${data.userIdB}/get`, withCredentials: true })
    },
    async getCurrentUserRoom() {
        return await apiClient<{ statusCode: number, data: { room: RoomType, user: AliasType }[] | [] }>({ url: '/room/current/get', withCredentials: true })
    },
    async getUserRoom() {
        return await apiClient<{ statusCode: number, data: { room: RoomType, alias: FriendType | UserType | null }[] | [] }>({ url: '/room/user/get', withCredentials: true })
    },
    async getRoomById(data: { roomId: string }) {
        return await apiClient<{ statusCode: number, data: { room: RoomType, user: AliasType | null } }>({ url: `/room/${data.roomId}/get`, withCredentials: true })
    },
    async getFriendWithJoinStatus(data: { roomId: string }) {
        return await apiClient<{ data: { user: FriendType, isJoined: boolean }[] }>({ url: `/room/${data.roomId}/friend-join-status/get`, withCredentials: true })
    },
    async createPrivateRoom(data: { userIdB: string }) {
        return await apiClient<{ statusCode: number, data: RoomType }>({ url: "/room/private-room/post", data, withCredentials: true, method: "post" })
    },
    async createGroupRoom(data: { roomName: string, userIds: string[], file: File }) {
        const formData = new FormData()
        formData.append("roomName", data.roomName)
        formData.append("avatar", data.file)
        data.userIds.forEach((id) => {
            formData.append("userIds", id)
        })
        return await apiClient<{ message: string, data: { room: RoomType } }>({ url: `/room/group-room/post`, withCredentials: true, data: formData, method: "post" })
    },
    async updateRoomName(data: { roomId: string, roomName: string }) {
        return await apiClient<{ message: string, data: Partial<RoomType> }>({ url: `/room/${data.roomId}/name/patch`, data: { roomName: data.roomName }, withCredentials: true, method: "patch" })
    },
    async updateRoomDesc(data: { roomId: string, description: string }) {
        return await apiClient<{ message: string, data: Partial<RoomType> }>({ url: `/room/${data.roomId}/desc/patch`, data: { description: data.description }, withCredentials: true, method: "patch" })
    },
    async outGroup(data: { roomId: string }) {
        return await apiClient<{ message: string, data: MemberType }>({ url: `/room/${data.roomId}/out-group/delete`, withCredentials: true, method: "delete" })
    }
}