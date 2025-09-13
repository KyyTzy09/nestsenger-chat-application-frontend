import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import type { Route } from "../+types";
import { profileService } from "~/features/profile/service/profile-service";
import { redirect, useLoaderData } from "react-router";
import { getSession } from "~/features/auth/services/get-session";

export default function ChatIndex() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen bg-[#232323] text-gray-400">
      <FaWhatsapp className="w-10 h-10" />
      <p className="text-white text-lg font-semibold">Nestsenger</p>
      <p className="text-sm">Belum ada chat yang dibuka</p>
    </div>
  );
}
