import { useMutation, useQuery } from "@tanstack/react-query"
import { FriendService } from "../services/friend-service"
import { toast } from "sonner"

export const useAddFriendMutation = (setIsOpen: (value: boolean) => void) => {
    return useMutation({
        mutationKey: ["add-friend"],
        mutationFn: async (data: { alias: string, friendId: string }) => await FriendService.addFriend(data),
        onSuccess: (data) => {
            toast.success("Sukses menambahkan teman")
            setIsOpen(false)
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