import { useMutation, useQuery } from "@tanstack/react-query"
import { ReadChatService } from "../services/readchat-service"
import { toast } from "sonner"

export const useGetReadChats = (data: { chatId: string }) => {
    return useQuery({
        queryKey: ['read-chats', data.chatId],
        queryFn: async () => await ReadChatService.getReadChats(data),
        staleTime: 1000 * 60 * 2,
    })
}