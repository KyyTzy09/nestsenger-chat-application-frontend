import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ChatService } from "../services/chat-service"
import { toast } from "sonner"

export const useGetChats = (data: { roomId: string }) => {
    return useQuery({
        queryKey: ['chat', data.roomId],
        queryFn: async () => await ChatService.getChat(data),
        staleTime: 1000 * 60 * 2,
    })
}

export const useGetChatParent = (data: { chatId: string }) => {
    return useQuery({
        queryKey: ['chat-parent', data.chatId],
        queryFn: async () => await ChatService.getChatParent(data),
        staleTime: 1000 * 60 * 2,
    })
}

export const useCreateChat = (roomId: string,) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['create-chat'],
        mutationFn: async (data: { message: string, parentId?: string }) => await ChatService.createChat({ message: data.message, roomId, parentId: data.parentId }),
        onSuccess: () => {
            toast.success('Berhasil mengirim chat')
            queryClient.invalidateQueries({ queryKey: ['chat', roomId], refetchType: "all" })
        },
        onError: (err) => {
            toast.error(err.message || "Gagal mengirim chat")
        }
    })
}