import z from "zod";

export const createGroupSchema = z.object({
    roomName: z.string().min(3, "Nama grup minimal 3 karakter"),
})

export type createGroupType = z.infer<typeof createGroupSchema>