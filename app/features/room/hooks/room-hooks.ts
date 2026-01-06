import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

export const useCreateGroupRoom = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ["creat-group"],
        mutationFn: async (data: { roomName: string, userIds: string[], file: File }) => await RoomService.createGroupRoom(data),
        onSuccess: (data) => {
            navigate(`/chat/${data?.data?.room?.roomId}`)
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}

export const useUpdateRoomName = (roomId: string, onSuccess: () => void) => {
    return useMutation({
        mutationKey: ['update-room-name', roomId],
        mutationFn: async (roomName: string) => await RoomService.updateRoomName({ roomId, roomName }),
        onSuccess: () => {
            onSuccess()
        },
        onError: (err) => {
            toast.error(err.message || "Gagal mengubah nama grup")
        }
    })
}

export const useUpdateRoomDesc = (roomId: string, onSuccess: () => void) => {
    return useMutation({
        mutationKey: ['update-room-desc', roomId],
        mutationFn: async (description: string) => await RoomService.updateRoomDesc({ roomId, description }),
        onSuccess: () => {
            onSuccess()
        },
        onError: (err) => {
            toast.error(err.message || "Gagal mengubah deskripsi grup")
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

export const useOutGroup = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['out-group'],
        mutationFn: async (data: { roomId: string }) => await RoomService.outGroup(data),
        onSuccess: () => {
            toast.success("Berhasil keluar dari grup")
            queryClient.invalidateQueries({ queryKey: ['room'], refetchType: "all" })
            queryClient.invalidateQueries({ queryKey: ['current-room'], refetchType: "all" })
            navigate('/chat')
        },
        onError: (err) => {
            toast.error(err.message || "Gagal keluar grup")
        }
    })
}