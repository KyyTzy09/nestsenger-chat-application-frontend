import { useMutation, useQuery } from "@tanstack/react-query"
import { RoomService } from "../services/room-service"
import { useNavigate } from "react-router"
import { toast } from "sonner"

export const useCreateOrGetRoom = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ['get-create-room'],
        mutationFn: async (data: { userIdB: string }) => await RoomService.createOrGetRoom(data),
        onSuccess: async (data) => {
            navigate(`/chat/${data?.data?.room.roomId}`)
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}

export const useGetCurrentUserRoom = () => {
    return useQuery({
        queryKey: ['current-room'],
        queryFn: async () => await RoomService.getCurrentUserRoom(),
        staleTime: 1000 * 60 * 2
    })
}

export const useGetUserRoom = () => {
    return useQuery({
        queryKey: ['user-room'],
        queryFn: async () => await RoomService.getUserRoom(),
        staleTime: 1000 * 60 * 1
    })
}

export const useGetRoomById = (data: { roomId: string }) => {
    return useQuery({
        queryKey: ['room', data.roomId],
        queryFn: async () => await RoomService.getRoomById(data),
        staleTime: 1000 * 60 * 2,
        enabled: !!data.roomId
    })
}