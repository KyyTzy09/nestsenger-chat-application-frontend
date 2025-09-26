import type { ProfileType } from "./profile-type"
import type { UserType } from "./user-type"

export type FriendType = {
    id: string
    alias: string
    userId: string
    friendId: string

    createdAt: Date
    updatedAt: Date

    user: UserType
    friend: ProfileType
}
