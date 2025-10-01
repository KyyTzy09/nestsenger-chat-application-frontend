import { useMutation } from "@tanstack/react-query"
import { ChatService } from "../services/chat-service"
import { toast } from "sonner"

export const useCreateChat = () => {
    return useMutation({
        mutationKey: ['create-chat'],
        mutationFn: async (data: { roomId: string, message: string }) => await ChatService.createChat(data),
        onSuccess: () => {
            toast.success('Berhasil mengirim chat')
        },
        onError: (err) => {
            toast.error(err.message || "Gagal mengirim chat")
        }
    })
}