import { useQuery } from "@tanstack/react-query"
import { profileService } from "../service/profile-service"

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => await profileService.getProfile(),
        staleTime: 1000 * 60 * 1
    })
}