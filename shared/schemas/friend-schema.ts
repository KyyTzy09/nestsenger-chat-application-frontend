import * as z from "zod"

export const addFriendSchema = z.object({
    alias: z.string().min(3, "Mohon isi minimal 3 karakter").max(25, "karakter maksimal 25")
})

export type addFriendType = z.infer<typeof addFriendSchema>