import { useMutation } from "@tanstack/react-query";
import type { loginType, registerType } from "shared/schemas/auth-schema";
import { AuthService } from "../services/auth-sevice";
import { useNavigate } from "react-router";

export const useLogin = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: loginType) => await AuthService.Login(data),
        onSuccess: () => {
            navigate("/chat")
        },
        onError: (err) => {
            alert(err.message || "Login gagal")
        }
    })
}

export const useRegister = (setTabs: (value: string) => void) => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: async (data: registerType) => await AuthService.Register(data),
        onSuccess: () => {
            setTabs("login")
        },
        onError: (err) => {
            alert(err.message || "Login gagal")
        }
    })
}

export const useLogout = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => await AuthService.Logout(),
        onSuccess: () => {
            navigate("/")
        },
        onError: (err) => {
            alert(err.message || "Logout gagal")
        }
    })
}