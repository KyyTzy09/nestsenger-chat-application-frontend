import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MemberService } from "../services/member-service"
import { toast } from "sonner"

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

export const useAddGroupMembers = (roomId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['add-member', roomId],
        mutationFn: async (userIds: string[]) => await MemberService.addGroupMembers({ roomId, userIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['member', roomId] });
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })
}