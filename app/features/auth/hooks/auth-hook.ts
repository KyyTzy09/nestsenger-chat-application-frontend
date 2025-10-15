import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { loginType, registerType } from "shared/schemas/auth-schema";
import { AuthService } from "../services/auth-sevice";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLogin = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: loginType) => await AuthService.Login(data),
        onSuccess: () => {
            toast.success("Login berhasil", {
                duration: 3000,
                style: { color: "green" }
            })
            navigate("/chat")
        },
        onError: (err) => {
            toast.error(err.message || "Login gagal", {
                duration: 3000,
                style: { color: "red" }
            })
        }
    })
}

export const useRegister = (setTabs: (value: string) => void) => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: async (data: registerType) => await AuthService.Register(data),
        onSuccess: () => {
            toast.success("Berhasil mendaftar", {
                duration: 3000,
                style: { color: "green" }
            })
            setTabs("login")
        },
        onError: (err) => {
            toast.error(err.message || "Login gagal", {
                duration: 3000,
                style: { color: "red" }
            })
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => await AuthService.Logout(),
        onSuccess: () => {
            toast.success("Logout berhasil", {
                style: { color: "green", }
            })
            queryClient.invalidateQueries()
            navigate("/")
        },
        onError: (err) => {
            alert(err.message || "Logout gagal")
        }
    })
}