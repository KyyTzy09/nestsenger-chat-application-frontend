import { apiClient } from "shared/helpers/axios"
import type { AliasType } from "shared/types/alias-type"
import type { StatusType } from "shared/types/status-type"

export const StatusService = {
    async createNewStatus(data: { file: File, message: string }) {
        const formData = new FormData()
        formData.append("media", data.file)
        formData.append("message", data.message)
        return await apiClient<{ message: string, data: StatusType }>({ url: "/status/create/post", method:"post", data: formData, withCredentials: true })
    },
    async getTodayStatuses() {
        return await apiClient<{ data: { alias: AliasType, statuses: StatusType[] }[] }>({ url: "/status/today/get", withCredentials: true })
    },
    async getTodayUserStatuses() {
        return await apiClient<{ data: { alias: AliasType, statuses: StatusType[] } }>({ url: "/status/today-user/get", withCredentials: true })
    }
}