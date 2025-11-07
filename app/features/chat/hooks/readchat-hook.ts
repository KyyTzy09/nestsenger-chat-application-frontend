import { useQuery } from "@tanstack/react-query"
import { ReadChatService } from "../services/readchat-service"

export const useGetReadChats = (data: { chatId: string }) => {
    return useQuery({
        queryKey: ['read-chats', data.chatId],
        queryFn: async () => await ReadChatService.getReadChats(data),
        staleTime: 1000 * 60 * 2,
    })
}

export const useCountRoomUnreadChats = (data: { roomId: string }) => {
    return useQuery({
        queryKey: ['unread-chat', data.roomId],
        queryFn: async () => await ReadChatService.countRoomUnreadChats(data),
        staleTime: 1000 * 60 * 2,
    })
}