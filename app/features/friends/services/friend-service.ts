import { apiClient } from "shared/helpers/axios"
import type { FriendType } from "shared/types/friend-type"
import type { RoomType } from "shared/types/room-type"
import type { UserType } from "shared/types/user-type"

export const FriendService = {
    async addFriend(data: { alias: string, friendId: string }) {
        return await apiClient<{ message: string, statusCode: number, data: { friend: FriendType, room: RoomType } }>({ url: "/friend/add-friend/post", data, method: "post", withCredentials: true })
    },

    async getNonFriendUsers() {
        return await apiClient<{ data: UserType[] }>({ url: "/friend/non-friends/get", withCredentials: true })
    }
}