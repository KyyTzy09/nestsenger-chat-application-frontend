import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ReactionService } from "../services/reaction-service"
import { toast } from "sonner"

export const useCreateReaction = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['create-reaction'],
        mutationFn: async (data: { chatId: string, content: string }) => await ReactionService.createReaction(data),
        onSuccess: (data, v) => {
            queryClient.invalidateQueries({ queryKey: ['chat'], refetchType: 'all' })
            queryClient.invalidateQueries({ queryKey: ['reaction', v.chatId], refetchType: 'all' })
            queryClient.invalidateQueries({ queryKey: ['user-reaction', v.chatId], refetchType: 'all' })
        },
        onError: () => {
            toast.error("Gagal mengirim reaksi")
        }
    })
}

export const useGetChatReactions = (data: { chatId: string }) => {
    return useQuery({
        queryKey: ['reaction', data.chatId],
        queryFn: async () => await ReactionService.getChatReactions(data),
        staleTime: 1000 * 60 * 1
    })
}

export const useGetUserReaction = (data: { chatId: string }) => {
    return useQuery({
        queryKey: ['user-reaction', data.chatId],
        queryFn: async () => await ReactionService.getUserReaction(data),
        staleTime: 1000 * 60 * 1
    })
}

export const useDeleteReactionById = (data: { chatId: string }) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['delete-reaction'],
        mutationFn: async (data: { reactionId: string }) => await ReactionService.deleteReactionById(data),
        onSuccess: () => {
            queryClient.setQueryData(['user-reaction', data.chatId], null)
            queryClient.invalidateQueries({ queryKey: ['chat'], refetchType: 'all' })
            queryClient.invalidateQueries({ queryKey: ['reaction', data.chatId], refetchType: "all" })
        },
        onError: (err) => {
            toast.error(err.message || "Gagal menghapus reaksi")
        }
    })
}