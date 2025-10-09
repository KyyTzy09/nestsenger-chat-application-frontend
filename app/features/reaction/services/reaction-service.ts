import { apiClient } from "shared/helpers/axios"

export const ReactionService = {
    async createReaction(data: { chatId: string, content: string }) {
        return await apiClient<{ message: string, statusCode: number }>({ url: "/reaction/create/post", data, withCredentials: true, method: "post" })
    }
}