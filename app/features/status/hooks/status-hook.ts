import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { StatusService } from "../services/status-service"
import { toast } from "sonner"

export const useCreateStatus = (onSuccess: () => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['create-statuses'],
        mutationFn: async (data: { file: File, message: string }) => await StatusService.createNewStatus(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['status-user'], type: "all" })
            onSuccess()
        },
        onError: (err) => {
            toast.error(err.message || "Gagal Mengirim Status")
        }
    })
}

export const useGetTodayUserStatuses = () => {
    return useQuery({
        queryKey: ['status-user'],
        queryFn: async () => await StatusService.getTodayUserStatuses(),
        staleTime: 2000 * 60 * 60
    })
}

export const useGetTodayStatuses = () => {
    return useQuery({
        queryKey: ['status-today'],
        queryFn: async () => await StatusService.getTodayStatuses(),
        staleTime: 2000 * 60 * 60
    })
}
