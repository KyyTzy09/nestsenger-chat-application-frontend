import * as z from "zod"

export const registerSchema = z.object({
    username: z.string().min(3, "minimal 3 karakter"),
    email: z.email("Email tidak valid").min(1, "Email wajib diisi"),
    password: z.string().min(8, "Password minimal 8 karakter").nonempty("Password wajib diisi")
})
export type registerType = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    user: z.string().min(3, "minimal 3 karakter"),
    password: z.string().min(8, "Password minimal 8 karakter").nonempty("Password wajib diisi")
})
export type loginType = z.infer<typeof loginSchema>