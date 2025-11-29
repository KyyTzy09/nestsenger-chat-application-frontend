import { apiClient } from "shared/helpers/axios";
import type { loginType, registerType } from "shared/schemas/auth-schema";
import type { UserType } from "shared/types/user-type";

export const AuthService = {
    async Session() {
        return await apiClient<{ message: string, data: UserType }>({ url: "/auth/session", withCredentials: true })
    },
    async Login(data: loginType) {
        return await apiClient<{ message: string, statusCode: number }>({ url: "/auth/login", method: "post", data, withCredentials: true })
    },

    async Register(data: registerType) {
        return await apiClient<{ message: string, statusCode: number }>({ url: "/auth/register", method: "post", data })
    },

    async Logout() {
        return await apiClient<{ message: string, statusCode: number }>({ url: "/auth/logout", method: "post", withCredentials: true })
    }
}