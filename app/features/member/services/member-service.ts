import { apiClient } from "shared/helpers/axios"
import type { MemberType } from "shared/types/member-type"

export const MemberService = {
    async getMemberRoom(data: { roomId: string }) {
        return await apiClient<{ data: MemberType[] }>({ url: `/member/${data.roomId}/get`, withCredentials: true })
    }
}