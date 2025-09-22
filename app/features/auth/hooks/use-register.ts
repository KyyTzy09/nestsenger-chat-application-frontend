import { useMutation } from "@tanstack/react-query";
import type { registerType } from "shared/schemas/auth-schema";
import { AuthService } from "../services/auth-sevice";
import { useNavigate } from "react-router";

export const useRegister = (setTabs: (value: string) => void) => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: async (data: registerType) => await AuthService.Register(data),
        onSuccess: (data) => {
            setTabs("login")
        },
        onError: (err) => {
            alert(err.message || "Login gagal")
        }
    })
}