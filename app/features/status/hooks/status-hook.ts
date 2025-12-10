import { useQuery } from "@tanstack/react-query"
import { StatusService } from "../services/status-service"

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