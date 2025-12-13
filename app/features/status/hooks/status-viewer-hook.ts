import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ViewerService } from "../services/status-viewer-service"
import { toast } from "sonner"

export const useGetTodayUserViewers = () => {
    return useQuery({
        queryKey: ['viewers-user'],
        queryFn: async () => await ViewerService.getTodayUserViewers(),
        staleTime: 2000 * 60 * 60
    })
}

export const useUpdateViewStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['update-status'],
        mutationFn: async (data: { viewerId: string, statusId: string }) => await ViewerService.updateViewStatus(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['status-viewer', data?.data?.statusId], type: "all" })
            queryClient.invalidateQueries({ queryKey: ['viewers-user'], type: "all" })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
}