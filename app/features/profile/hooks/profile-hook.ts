import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { profileService } from "../service/profile-service"

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => await profileService.getProfile(),
        staleTime: 1000 * 60 * 1
    })
}

export const usePatchName = () => {
    const queryClient = new QueryClient()
    return useMutation({
        mutationKey: ["patch-name"],
        mutationFn: async (data: { userName: string }) => await profileService.updateName(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"], exact: true })
        },
        onError: (err) => {
            alert(err.message || "Gagal ubah nama")
        }
    })
}

export const usePatchBio = () => {
    const queryClient = new QueryClient()
    return useMutation({
        mutationKey: ["patch-name"],
        mutationFn: async (data: { bio: string }) => await profileService.updateBio(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"], exact: true })
        },
        onError: (err) => {
            alert(err.message || "Gagal ubah bio")
        }
    })
}