import React from "react";

interface ChatDetailProps {
  params: { chatId: string };
}

export default function ChatDetail({ params }: ChatDetailProps) {
  const { chatId } = params;

  return (
    <div className="w-full">
      <p>{chatId}</p>
    </div>
  );
}
