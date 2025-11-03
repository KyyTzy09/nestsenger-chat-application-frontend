import { apiClient } from "shared/helpers/axios"
import type { AliasType } from "shared/types/alias-type"
import type { ReadChatType } from "shared/types/readchat-type"

export const ReadChatService = {
    async getReadChats(data: { chatId: string }) {
        return await apiClient<{ data: { readChat: ReadChatType, alias: AliasType }[] }>({ url: `/readchat/${data.chatId}/get`, withCredentials: true })
    },
    async readChat(data: { roomId: string }) {
        return await apiClient<{ data: { data: ReadChatType } }>({ url: `/readchat/${data.roomId}/patch`, method: "patch", withCredentials: true })
    }
}