import { useQuery } from "@tanstack/react-query"
import { MemberService } from "../services/member-service"

export const useGetRoomMember = (data: { roomId: string }) => {
    return useQuery({
        queryKey: ['member', data.roomId],
        queryFn: async () => await MemberService.getMemberRoom(data),
        staleTime: 1000 * 60 * 2,
    })
}

export const useGetMemberRole = (roomId: string) => {
    return useQuery({
        queryKey: ['member-role', roomId],
        queryFn: async () => await MemberService.getMemberRole({ roomId }),
        staleTime: Infinity
    })
}