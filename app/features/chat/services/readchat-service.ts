import { apiClient } from "shared/helpers/axios"
import type { AliasType } from "shared/types/alias-type"

export const ReadChatService = {
    async getReadChats(data: { chatId: string }) {
        return await apiClient<{ data: { readchat: any, alias: AliasType }[] }>({ url: `/readchat/${data.chatId}/get` })
    }
}