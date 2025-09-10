import { apiClient } from "shared/helpers/axios";
import type { loginType, registerType } from "shared/schemas/auth-schema";

export const AuthService = {
    async Login(data: loginType) {
        return await apiClient<{ message: string, status: number, token: string }>({ url: "/auth/login", method: "post", data, withCredentials: true })
    },

    async Register(data: registerType) {
        return await apiClient<{ message: string, status: number, token: string }>({ url: "/auth/register", method: "post", data })
    }
}