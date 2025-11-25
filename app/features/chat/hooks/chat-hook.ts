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

export const useGetDeletedChats = (data: { roomId: string }) => {
    return useQuery({
        queryKey: ['deleted-chats', data.roomId],
        queryFn: async () => await ChatService.getDeletedChats(data),
        staleTime: 1000 * 60 * 2
    })
}

export const useCreateChat = (roomId: string,) => {
    return useMutation({
        mutationKey: ['create-chat'],
        mutationFn: async (data: { message: string, parentId?: string }) => await ChatService.createChat({ message: data.message, roomId, parentId: data.parentId }),
        onError: (err) => {
            toast.error(err.message || "Gagal mengirim chat")
        }
    })
}

export const useCreateChatWithMedia = () => {
    return useMutation({
        mutationKey: ["create-chat-media"],
        mutationFn: async (data: { roomId: string, file: File, message: string, parentId?: string }) => await ChatService.createChatWithMedia(data),
        onSuccess: () => {
            toast.success("Berhasil kirim pesan")
        },
        onError: (err) => {
            toast.error(err.message || "Gagal kirim pesan")
        }
    })
}

export const useDeleteChatForAll = (roomId: string, onSuccess: () => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["delete-all"],
        mutationFn: async (data: { chatId: string }) => await ChatService.deleteChatForAll(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chat', roomId], type: "all" })
            queryClient.invalidateQueries({ queryKey: ['deleted-chats', roomId], type: "all" })
            onSuccess()
        },
        onError: (err) => {
            toast.error(err.message || "Gagal menghapus chat")
        }
    })
}

export const useDeleteChatForSelf = (roomId: string, onSuccess: () => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["delete-self"],
        mutationFn: async (data: { chatId: string }) => await ChatService.deleteChatForSelf(data),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['chat', roomId], type: "all" })
            queryClient.refetchQueries({ queryKey: ['deleted-chats', roomId], type: "all" })
            onSuccess()
        },
        onError: (err) => {
            toast.error(err.message || "Gagal menghapus chat")
        }
    })
}