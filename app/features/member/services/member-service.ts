import { apiClient } from "shared/helpers/axios"
import type { FriendType } from "shared/types/friend-type"
import type { MemberType } from "shared/types/member-type"
import type { UserType } from "shared/types/user-type"

export const MemberService = {
    async getMemberRoom(data: { roomId: string }) {
        return await apiClient<{ data: ({ member: MemberType, alias: FriendType | UserType | null }[] | []) | (MemberType | null) }>({ url: `/member/${data.roomId}/room/get`, withCredentials: true })
    },
    async getMemberRole(data: { roomId: string }) {
        return await apiClient<{ data: MemberType }>({ url: `/member/${data.roomId}/room/role/get`, withCredentials: true })
    }
}