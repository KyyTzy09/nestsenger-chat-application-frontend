import type { FriendType } from "./friend-type"
import type { MemberType } from "./member-type"
import type { ProfileType } from "./profile-type"
import type { ReactionType } from "./reaction-type"

export type UserType = {
    userId: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date

    profile: ProfileType
    rooms: MemberType[]
    friends: FriendType[]
    reactions: ReactionType[]
}
