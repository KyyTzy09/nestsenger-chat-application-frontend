import { useEffect, useState } from "react";
import type { StatusType } from "shared/types/status-type";

interface IStatusProgress {
    selectedIndex: number | null | undefined;
    isOpen: boolean
    statuses: StatusType[];
    videoRefs: React.RefObject<(HTMLVideoElement | null)[]>;
    onFinish: () => void;
}

export function useStatusProgress({
    selectedIndex,
    isOpen,
    statuses,
    videoRefs,
    onFinish,
}: IStatusProgress) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (selectedIndex == null) return;

        const current = statuses[selectedIndex];
        const isVideo = current?.mediaType === "video";

        setProgress(0);

        // HANDLE VIDEO
        if (isVideo) {
            const video = videoRefs.current[selectedIndex];
            if (!video) return;

            const handleTimeUpdate = () => {
                if (!video.duration) return;
                const percent = (video.currentTime / video.duration) * 100;
                setProgress(percent);

                if (percent >= 100) {
                    onFinish();
                }
            };

            video.addEventListener("timeupdate", handleTimeUpdate);

            return () => {
                video.removeEventListener("timeupdate", handleTimeUpdate);
            };
        }
        // HANDLE IMAGE — auto 5 detik
        else {
            const timer = setInterval(() => {
                setProgress((p) => {
                    if (p >= 100) {
                        onFinish();
                        return 100;
                    }
                    return p + 2;
                });
            }, 100);

            return () => clearInterval(timer);
        }
    }, [selectedIndex, isOpen]);

    return progress;
}
