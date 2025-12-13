import { useQuery } from "@tanstack/react-query"
import { ViewerService } from "../services/status-viewer-service"

export const useGetTodayUserViewers = () => {
    return useQuery({
        queryKey: ['viewers-user'],
        queryFn: async () => await ViewerService.getTodayUserViewers(),
        staleTime: 2000 * 60 * 60
    })
}