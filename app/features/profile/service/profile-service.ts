import { apiClient } from "shared/helpers/axios"
import type { UserType } from "shared/types/user-type"

export const profileService = {
    async getProfile() {
        return await apiClient<{ data: UserType }>({ url: "/profile/get", withCredentials: true })
    },
    async updateName(data: { userName: string }) {
        return await apiClient<{ message: string, statusCode: number }>({ url: "/profile/name/patch", method: "patch", data, withCredentials: true })
    },
    async updateBio(data: { bio: string }) {
        return await apiClient<{ message: string, statusCode: number }>({ url: "/profile/bio/patch", method: "patch", data, withCredentials: true })
    },
    async updateAvatar(data: { file: Blob | null }) {
        const formData = new FormData()
        formData.append("file", data.file!, "-avatar.png")
        return await apiClient<{ message: string }>({ url: "/profile/avatar/patch", data: formData, method: "patch", withCredentials: true })
    }
}