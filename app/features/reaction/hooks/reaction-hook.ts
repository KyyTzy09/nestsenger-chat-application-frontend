import { useMutation, useQuery } from "@tanstack/react-query"
import { ReactionService } from "../services/reaction-service"
import { toast } from "sonner"

export const useCreateReaction = () => {
    return useMutation({
        mutationKey: ['create-reaction'],
        mutationFn: async (data: { chatId: string, content: string }) => await ReactionService.createReaction(data),
        onSuccess: () => {

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