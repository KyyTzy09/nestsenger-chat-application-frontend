import { apiClient } from "shared/helpers/axios"
import type { FriendType } from "shared/types/friend-type"
import type { ReactionType } from "shared/types/reaction-type"
import type { UserType } from "shared/types/user-type"

export const ReactionService = {
    async createReaction(data: { chatId: string, content: string }) {
        return await apiClient<{ message: string, statusCode: number }>({ url: "/reaction/create/post", data, withCredentials: true, method: "post" })
    },
    async getChatReactions(data: { chatId: string }) {
        return await apiClient<{ statusCode: string, data: { reaction: ReactionType, alias: FriendType | UserType | null }[] | [] }>({ url: `/reaction/${data.chatId}/chat/get`, withCredentials: true })
    },
    async getUserReaction(data: { chatId: string }) {
        return await apiClient<{ statusCode: string, data: ReactionType }>({ url: `/reaction/${data.chatId}/user/get`, withCredentials: true })
    },
    async deleteReactionById(data: { reactionId: string }) {
        return await apiClient<{ statusCode: number }>({ url: `/reaction/${data.reactionId}/delete`, withCredentials: true, method: 'delete' })
    }
}