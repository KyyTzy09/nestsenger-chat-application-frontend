import { apiClient } from "shared/helpers/axios"

export const FriendService = {
    async addFriend(data: { alias: string, friendId: string }) {
        return await apiClient<{ message: string, statusCode: number }>({ url: "/friend/add-friend/post", data, method: "post", withCredentials: true })
    }
}