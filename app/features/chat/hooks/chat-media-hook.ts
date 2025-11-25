import { useQuery } from "@tanstack/react-query"
import { MediaService } from "../services/chat-media-service"

export const useGetNonFileMedia = (data: { roomId: string }) => {
    return useQuery({
        queryKey: ['media-non-file', data.roomId],
        queryFn: async () => await MediaService.getNonFileMedia(data),
    })
}