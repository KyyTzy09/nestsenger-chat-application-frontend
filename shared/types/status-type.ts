import type { FriendType } from "./friend-type"
import type { UserType } from "./user-type"

export type StatusType = {
    statusId: string
    mediaName: string | null
    mediaUrl: string
    mediaType: "image" | "video" | "audio" | "file"
    message: string | null

    createdAt: Date
    creatorId: string

    creator: UserType
    viewers: StatusViewer[]
}

export type StatusViewer = {
    viewerId: string

    statusId: string

    isViewed: boolean | false

    createdAt: Date
    updatedAt: Date

    status: StatusType
    friend: FriendType
}

