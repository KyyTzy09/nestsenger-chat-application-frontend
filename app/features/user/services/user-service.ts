import { apiClient } from "shared/helpers/axios"
import type { UserType } from "shared/types/user-type"

export const UserService = {
    async getUserById(data: { userId: string }) {
        return await apiClient<{ data: UserType }>({ url: `/user/${data.userId}/get-id` })
    },
    async getAllUser() {
        return await apiClient<{ data: UserType[] }>({ url: '/user/get', withCredentials: true })
    }
}