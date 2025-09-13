import React from "react";
import { FaWhatsapp } from "react-icons/fa";



export default function ChatPage() {
  
    return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen bg-[#232323] text-gray-400">
      <FaWhatsapp className="w-10 h-10" />
      <p className="text-white text-lg font-semibold">Nestsenger</p>
      <p className="text-sm"></p>
    </div>
  );
}
