import React from "react";

interface ProgressSectionProps {
  count: number;
  activeIndex: number;
  progress: number;
}

export default function ProgressSection({
  count,
  activeIndex,
  progress,
}: ProgressSectionProps) {
  return (
    <section className="flex items-center justify-center w-[40%] gap-1">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === activeIndex;
        const isPassed = i < activeIndex;

        return (
          <div
            key={i}
            className="flex-1 h-[3px] bg-white/30 rounded-md overflow-hidden"
          >
            <div
              className="h-full bg-blue-500 transition-all duration-100 linear"
              style={{
                width: isPassed ? "100%" : isActive ? `${progress}%` : "0%",
              }}
            />
          </div>
        );
      })}
    </section>
  );
}
