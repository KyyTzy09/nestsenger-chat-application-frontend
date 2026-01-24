import axios from "axios"
import { baseUrl } from "shared/constants/baseurl"
import { apiClient } from "shared/helpers/axios"
import type { AliasType } from "shared/types/alias-type"
import type { ReadChatType } from "shared/types/readchat-type"

export const ReadChatService = {
    async getReadChats(data: { chatId: string }) {
        return await apiClient<{ data: { readChat: ReadChatType, user: AliasType }[] }>({ url: `/readchat/${data.chatId}/get`, withCredentials: true })
    },
    async getReadChatsByRoomId(data: { roomId: string }) {
        return await apiClient<{ data: { readChat: ReadChatType, user: AliasType }[] }>({ url: `/readchat/${data.roomId}/room/get`, withCredentials: true })
    },
    async readChat(data: { roomId: string }) {
        try {
            return await apiClient<{ data: { data: ReadChatType } }>({ url: `/readchat/${data.roomId}/patch`, method: "patch", withCredentials: true })
        } catch (error) {
            return;
        }
    },
    async countAllRoomUnreadChats() {
        return await apiClient<{ data: number }>({ url: "/readchat/unread/get", withCredentials: true })
    },
    async countRoomUnreadChats(data: { roomId: string }) {
        return await apiClient<{ data: number }>({ url: `/readchat/${data.roomId}/unread/get`, withCredentials: true })
    },
    async isChatHasRead(data: { chatId: string }) {
        return await apiClient<{ data: boolean }>({ url: `/readchat/${data.chatId}/has-read/get`, withCredentials: true })
    }
}