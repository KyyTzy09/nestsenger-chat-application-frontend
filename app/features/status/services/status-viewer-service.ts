import { apiClient } from "shared/helpers/axios"
import type { StatusViewer } from "shared/types/status-type"

export const ViewerService = {
    async getTodayUserViewers() {
        return await apiClient<{ data: StatusViewer[] }>({ url: "/viewer/today-user/get", withCredentials: true })
    },
    async updateViewStatus(data: { viewerId: string, statusId: string }) {
        return await apiClient<{ message: string, data: StatusViewer | null }>({ url: "/viewer/update/patch", data, withCredentials: true })
    }
}