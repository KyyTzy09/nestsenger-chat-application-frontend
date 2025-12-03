import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FriendService } from "../services/friend-service"
import { toast } from "sonner"
import { useNavigate } from "react-router"

export const useGetUserFriends = () => {
    return useQuery({
        queryKey: ['user-friend'],
        queryFn: async () => await FriendService.getUserFriends(),
        staleTime: 1000 * 60 * 2
    })
}

export const useGetFriendById = (data: { friendId: string }) => {
    return useQuery({
        queryKey: ['friend-byId', data.friendId],
        queryFn: async () => await FriendService.getFriendById(data),
        staleTime: 1000 * 60 * 1
    })
}

export const useAddFriendMutation = (setIsOpen: (value: boolean) => void) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ["add-friend"],
        mutationFn: async (data: { alias: string, friendId: string }) => await FriendService.addFriend(data),
        onSuccess: (data) => {
            toast.success("Sukses menambahkan teman")
            setIsOpen(false)
            navigate(`/chat/${data?.data.room.roomId}`)

            queryClient.invalidateQueries({ queryKey: ['friend'], type: "all" })
            queryClient.invalidateQueries({ queryKey: ['user-room'], type: "all" })
            queryClient.invalidateQueries({ queryKey: ['room'], type: "all" })
            queryClient.refetchQueries({ queryKey: ['non-friends'], type: "all" })
        },
        onError: ({ message }) => {
            toast.error(message || "Gagal menambahkan teman")
        }
    })
}

export const useUpdateFriendAlias = (onSuccess: () => void, roomId:string) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationKey: ["update-friend"],
        mutationFn: async (data: { alias: string, friendId: string }) => await FriendService.updateAlias(data),
        onSuccess: () => {
            onSuccess()
            navigate("/chat")
            queryClient.invalidateQueries({ queryKey: ['friend'] })
            queryClient.invalidateQueries({ queryKey: ['user-friend'] })
            queryClient.invalidateQueries({ queryKey: ['current-room'] })
            queryClient.invalidateQueries({ queryKey: ['room', roomId] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}

export const useGetNonFriendUsers = () => {
    return useQuery({
        queryKey: ["non-friends"],
        queryFn: async () => await FriendService.getNonFriendUsers(),
        staleTime: 1000 * 60 * 2
    })
}