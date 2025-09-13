import type { ProfileType } from "./profile-type"

export type UserType = {
    userId: string
    email: string
    password: string
    Profile: ProfileType

    createdAt: Date
    updatedAt: Date
}
