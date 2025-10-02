import { apiClient } from "shared/helpers/axios"
import type { ChatType } from "shared/types/chat-type"

export const ChatService = {
    async getChat(data: { roomId: string }) {
        return await apiClient<{ data: ChatType[] }>({ url: `/chat/${data.roomId}/get` })
    },
    async createChat(data: { roomId: string, message: string }) {
        return await apiClient<{ data: any }>({ url: '/chat/create/post', data, method: "post", withCredentials: true })
    }
}