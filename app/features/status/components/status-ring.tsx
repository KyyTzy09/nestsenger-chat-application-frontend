import React from "react";
import type { StatusType, StatusViewer } from "shared/types/status-type";
import { IsStatusViewed } from "./logic/isViewed-logic";

interface StatusRingProps {
  statuses: StatusType[];
  viewers: StatusViewer[];
  children: React.ReactNode;
  className: string;
}

export default function StatusRing({
  statuses,
  viewers,
  children,
  className,
}: StatusRingProps) {
  const gap = statuses?.length === 1 ? 0 : statuses?.length <= 20 ? 4 : 3;
  const step = 360 / statuses?.length;

  let gradients: string[] = [];

  statuses.forEach(({ statusId }, i) => {
    const start = i * step;
    const end = start + step - gap;
    const color = IsStatusViewed(statusId, viewers) ? '#9CA3AF' : "#3B82F6";

    gradients.push(`${color} ${start}deg ${end}deg`);
    gradients.push(`transparent ${end}deg ${(i + 1) * step}deg`);
  });

  const ringStyle = {
    padding: "3px",
    borderRadius: "9999px",
    background: `conic-gradient(${gradients.join(", ")})`,
  };

  return (
    <div style={ringStyle} className={className}>
      {children}
    </div>
  );
}
