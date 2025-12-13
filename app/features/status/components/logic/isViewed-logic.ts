import type { StatusViewer } from "shared/types/status-type";

export function IsStatusViewed(statusId: string, viewers: StatusViewer[]): boolean {
    const isStatusHasViewed = viewers.some(({ statusId: statusViewId, isViewed }) => {
        return statusId === statusViewId && isViewed === true
    })

    return isStatusHasViewed
}