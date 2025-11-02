import { apiClient } from "shared/helpers/axios"
import type { AliasType } from "shared/types/alias-type"

export const ReadChatService = {
    async getReadChats(data: { chatId: string }) {
        return await apiClient<{ data: { readChat: any, alias: AliasType }[] }>({ url: `/readchat/${data.chatId}/get`, withCredentials: true })
    }
}