import { apiClient } from "shared/helpers/axios"
import type { AliasType } from "shared/types/alias-type"
import type { StatusType } from "shared/types/status-type"

export const StatusService = {
    async getTodayStatuses() {
        return await apiClient<{ data: { alias: AliasType, statuses: StatusType[] }[] }>({ url: "/status/today/get", withCredentials: true })
    },
    async getTodayUserStatuses() {
        return await apiClient<{ data: { alias: AliasType, statuses: StatusType[] } }>({ url: "/status/today-user/get", withCredentials: true })
    }
}