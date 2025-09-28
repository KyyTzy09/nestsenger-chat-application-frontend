import { apiClient } from "shared/helpers/axios"
import type { UserType } from "shared/types/user-type"

export const FriendService = {
    async addFriend(data: { alias: string, friendId: string }) {
        return await apiClient<{ message: string, statusCode: number }>({ url: "/friend/add-friend/post", data, method: "post", withCredentials: true })
    },

    async getNonFriendUsers() {
        return await apiClient<{ data: UserType[] }>({ url: "/friend/non-friends/get", withCredentials: true })
    }
}