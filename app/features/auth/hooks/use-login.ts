import { QueryClient, useMutation } from "@tanstack/react-query"
import type { loginType } from "shared/schemas/auth-schema"
import { AuthService } from "../services/auth-sevice"
import { useNavigate } from "react-router"

export function useLogin() {
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: loginType) => await AuthService.Login(data),
        onSuccess: (data) => {
            alert(data?.message || "Login berhasil")
            navigate("/chat")
        },
        onError: (err) => {
            alert(err.message || "Login gagal")
        }
    })
}