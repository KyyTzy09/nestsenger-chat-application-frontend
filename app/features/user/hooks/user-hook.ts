import { useQuery } from "@tanstack/react-query"
import { UserService } from "../services/user-service"

export const useGetUser = () => {
    return useQuery({
        queryKey: ['all-user'],
        queryFn: async () => await UserService.getAllUser(),
        staleTime: 1000 * 60 * 1
    })
}

export const useGetUserById = (data: { userId: string }) => {
    return useQuery({
        queryKey: ['user-byId', data.userId],
        queryFn: async () => await UserService.getUserById(data),
        staleTime: 1000 * 60 * 2,
        enabled: !!data.userId
    })
}