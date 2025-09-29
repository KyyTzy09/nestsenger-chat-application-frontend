import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FriendService } from "../services/friend-service"
import { toast } from "sonner"

export const useAddFriendMutation = (setIsOpen: (value: boolean) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["add-friend"],
        mutationFn: async (data: { alias: string, friendId: string }) => await FriendService.addFriend(data),
        onSuccess: (data) => {
            toast.success("Sukses menambahkan teman")
            setIsOpen(false)
            queryClient.invalidateQueries({ queryKey: ['friend'] })
            queryClient.invalidateQueries({ queryKey: ['non-friend'] })
            queryClient.invalidateQueries({ queryKey: ['user-room'] })
            queryClient.invalidateQueries({ queryKey: ['room'] })
        },
        onError: ({ message }) => {
            toast.error(message || "Gagal menambahkan teman")
        }
    })
}

export const useGetNonFriendUsers = () => {
    return useQuery({
        queryKey: ["non-friend"],
        queryFn: async () => await FriendService.getNonFriendUsers(),
        staleTime: 1000 * 60 * 2
    })
}