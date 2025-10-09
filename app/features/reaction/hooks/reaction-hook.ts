import { useMutation } from "@tanstack/react-query"
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