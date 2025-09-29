import { useQuery } from "@tanstack/react-query"
import { RoomService } from "../services/room-service"

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