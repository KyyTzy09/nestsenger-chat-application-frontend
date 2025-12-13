import { apiClient } from "shared/helpers/axios"
import type { StatusViewer } from "shared/types/status-type"

export const ViewerService = {
    async getTodayUserViewers() {
        return await apiClient<{ data: StatusViewer[] }>({ url: "/viewer/today-user/get", withCredentials: true })
    }
}