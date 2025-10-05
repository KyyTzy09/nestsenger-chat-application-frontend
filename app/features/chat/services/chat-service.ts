import { apiClient } from "shared/helpers/axios"
import type { ChatType } from "shared/types/chat-type"
import type { FriendType } from "shared/types/friend-type"
import type { UserType } from "shared/types/user-type"

export const ChatService = {
    async getChat(data: { roomId: string }) {
        return await apiClient<{ data: { chat: ChatType, alias: FriendType | UserType }[] | [] }>({ url: `/chat/${data.roomId}/get`, withCredentials: true })
    },
    async getChatParent(data: { chatId: string }) {
        return await apiClient<{ data: { chat: ChatType, alias: FriendType | UserType } }>({ url: `/chat/${data.chatId}/parent/get`, withCredentials: true })
    },
    async createChat(data: { roomId: string, message: string }) {
        return await apiClient<{ data: ChatType }>({ url: '/chat/create/post', data, method: "post", withCredentials: true })
    }
}