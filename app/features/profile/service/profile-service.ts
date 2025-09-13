import { apiClient } from "shared/helpers/axios"
import type { UserType } from "shared/types/user-type"

export const profileService = {
    async getProfile() {
        return await apiClient<{ data: UserType }>({ url: "/profile/get", withCredentials: true })
    }
} 