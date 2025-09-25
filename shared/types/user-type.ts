import type { ProfileType } from "./profile-type"

export type UserType = {
    userId: string
    email: string
    password: string
    profile: ProfileType

    createdAt: Date
    updatedAt: Date
}
