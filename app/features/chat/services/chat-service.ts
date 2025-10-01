import { apiClient } from "shared/helpers/axios"

export const ChatService = {
    async createChat(data: { roomId: string, message: string }) {
        return await apiClient<{ data: any }>({ url: '/chat/create/post', data, method: "post", withCredentials: true })
    }
}