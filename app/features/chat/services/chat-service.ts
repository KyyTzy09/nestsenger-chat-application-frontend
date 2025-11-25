import { apiClient } from "shared/helpers/axios"
import type { AliasType } from "shared/types/alias-type"
import type { ChatType } from "shared/types/chat-type"
import type { DeletedChatType } from "shared/types/deleted-chat"
import type { FriendType } from "shared/types/friend-type"
import type { UserType } from "shared/types/user-type"

export const ChatService = {
    async getChat(data: { roomId: string }) {
        return await apiClient<{ data: { date: string, chats: { chat: ChatType, user: AliasType }[] }[] }>({ url: `/chat/${data.roomId}/get`, withCredentials: true })
    },
    async getChatParent(data: { chatId: string }) {
        return await apiClient<{ data: { chat: ChatType, user: AliasType } }>({ url: `/chat/${data.chatId}/parent/get`, withCredentials: true })
    },
    async getDeletedChats(data: { roomId: string }) {
        return await apiClient<{ data: DeletedChatType[] }>({ url: `/chat/deleted-chat/${data.roomId}/get` })
    },
    async createChat(data: { roomId: string, message: string, parentId?: string }) {
        return await apiClient<{ data: ChatType }>({ url: '/chat/create/post', data, method: "post", withCredentials: true })
    },
    async createChatWithMedia(data: { roomId: string, file: File, message: string, parentId?: string }) {
        const formData = new FormData()
        formData.append("file", data.file)
        formData.append("roomId", data.roomId)
        formData.append("message", data.message)
        if (data.parentId) {
            formData.append("parentId", data.parentId)
        }
        return await apiClient<{ message: string, data: ChatType }>({ url: `/chat/create-media/post`, data: formData, withCredentials: true, method: "post" })
    },
    async deleteChatForAll(data: { chatId: string }) {
        return await apiClient<{ message: string, statusCode: number }>({ url: `/chat/for-all/${data.chatId}/delete`, withCredentials: true, method: "delete" })
    },
    async deleteChatForSelf(data: { chatId: string }) {
        return await apiClient<{ message: string, statusCode: number }>({ url: `/chat/for-self/${data.chatId}/delete`, withCredentials: true, method: "delete" })
    }
}