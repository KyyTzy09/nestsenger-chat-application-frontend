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

export const useUpdateReadChat = (data: { roomId: string }) => {
    return useMutation({
        mutationKey: ['update-readchat', data.roomId],
        mutationFn: async () => await ReadChatService.readChat(data),
        onError: () => {
            toast.error("Gagal membaca pesan")
        }
    })
}