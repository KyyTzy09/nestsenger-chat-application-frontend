import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ReadChatService } from "../services/readchat-service"

export const useGetReadChats = (data: { chatId: string }) => {
    return useQuery({
        queryKey: ['read-chats', data.chatId],
        queryFn: async () => await ReadChatService.getReadChats(data),
        staleTime: 1000 * 60 * 2,
    })
}

export const useGetReadChatsByRoomId = (data: { roomId: string }) => {
    return useQuery({
        queryKey: ['read-chats-room', data.roomId],
        queryFn: async () => await ReadChatService.getReadChatsByRoomId(data),
        staleTime: 1000 * 60 * 2,
    })
}

export const useCountAllRoomUnreadChats = () => {
    return useQuery({
        queryKey: ['unread-chats'],
        queryFn: async () => await ReadChatService.countAllRoomUnreadChats(),
    })
}

export const useUpdateReadChat = (roomId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update-unread-chat"],
        mutationFn: async () => await ReadChatService.readChat({ roomId }),
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ["unread-chat", roomId],
                type: "active"
            });
            queryClient.refetchQueries({
                queryKey: ["unread-chats"],
                type: "active"
            });
        }
    })
}

export const useCountRoomUnreadChats = (data: { roomId: string }) => {
    return useQuery({
        queryKey: ['unread-chat', data.roomId],
        queryFn: async () => await ReadChatService.countRoomUnreadChats(data),
        staleTime: 0,
    })
}

export const useGetIsChatHasRead = (data: { chatId: string }) => {
    return useQuery({
        queryKey: ['ischatread', data.chatId],
        queryFn: async () => await ReadChatService.isChatHasRead(data),
        staleTime: 1000 * 60 * 2
    })
}