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

export const usePatchAvatar = (setFile: React.Dispatch<React.SetStateAction<Blob | null>>, setIsActive: (show: boolean) => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["update-avatar"],
        mutationFn: async (file: Blob | null,) => await profileService.updateAvatar({ file }),
        onSuccess: () => {
            setIsActive(false)
            setFile(null)
            queryClient.invalidateQueries({ queryKey: ["profile"], type: "all" })
        },
        onError: (err) => {
            alert(err.message || "Gagal ubah avatar")
        }
    })
}

export const useDeleteAvatar = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["delete-avatar"],
        mutationFn: async () => await profileService.deleteAvatar(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"], type: "all" })
        },
        onError: (err) => {
            console.log(err.message)
        }
    })
}