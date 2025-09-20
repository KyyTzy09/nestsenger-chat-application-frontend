import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { profileService } from "../service/profile-service"
import type React from "react"

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => await profileService.getProfile(),
        staleTime: 1000 * 60 * 1
    })
}

export const usePatchName = (setIsActive: React.Dispatch<React.SetStateAction<"" | "name" | "bio">>) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["patch-name"],
        mutationFn: async (data: { userName: string }) => await profileService.updateName(data),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["profile"], refetchType: "active" })
            setIsActive("")
        },
        onError: (err) => {
            alert(err.message || "Gagal ubah nama")
        }
    })
}

export const usePatchBio = (setIsActive: React.Dispatch<React.SetStateAction<"" | "name" | "bio">>) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["patch-name"],
        mutationFn: async (data: { bio: string }) => await profileService.updateBio(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"], type: "all" })
            setIsActive("")
        },
        onError: (err) => {
            alert(err.message || "Gagal ubah nama")
        }
    })
}

export const usePatchAvatar = (file: Blob | null, setFile: React.Dispatch<React.SetStateAction<Blob | null>>, setIsActive: React.Dispatch<React.SetStateAction<boolean>>) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["update-avatar"],
        mutationFn: async () => await profileService.updateAvatar({ file }),
        onSuccess: () => {
            setFile(null)
            setIsActive(false)
            queryClient.invalidateQueries({ queryKey: ["profile"], type: "all" })
        },
        onError: (err) => {
            setFile(null)
            alert(err.message || "Gagal ubah avatar")
        }
    })
}