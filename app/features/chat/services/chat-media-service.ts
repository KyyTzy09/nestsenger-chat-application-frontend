import { apiClient } from "shared/helpers/axios"
import type { ChatMediaType } from "shared/types/media-type"

export const MediaService = {
    async getNonFileMedia(data: { roomId: string }) {
        return await apiClient<{ data: ChatMediaType[] }>({ url: `/media/${data.roomId}/non-file/get`, withCredentials: true })
    }
}