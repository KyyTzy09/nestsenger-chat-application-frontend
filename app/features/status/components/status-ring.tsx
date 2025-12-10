import React from "react";

interface StatusRingProps {
  count: number;
  children: React.ReactNode;
  className: string;
}

export default function StatusRing({
  count = 1,
  children,
  className,
}: StatusRingProps) {
  const gap = count === 1 ? 0 : count <= 20 ? 4 : 3;
  const step = 360 / count;

  let gradients = [];

  for (let i = 0; i < count; i++) {
    const start = i * step;
    const end = start + step - gap;

    gradients.push(`#3B82F6 ${start}deg ${end}deg`);
    gradients.push(`transparent ${end}deg ${(i + 1) * step}deg`);
  }

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
