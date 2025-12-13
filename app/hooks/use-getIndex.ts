import React from "react";

interface IGetComponentIndex {
    cardRefs: React.RefObject<(HTMLDivElement | null)[]>;
    isOpen: boolean
}

export function useGetComponentIndex({ cardRefs, isOpen }: IGetComponentIndex) {
    const [selectedIndex, setSelectedIndex] = React.useState<number>();

    React.useEffect(() => {
        if (!cardRefs.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"));
                        setSelectedIndex(index);
                    }
                });
            },
            { threshold: 0.8 }
        );

        cardRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [isOpen, setSelectedIndex]);

    return selectedIndex
}