import React from "react";
import CreateStatusForm from "~/features/status/components/forms/create-status-form";
import StatusSidebar from "~/features/status/components/status-sidebar";

export default function StatusPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen">
      <CreateStatusForm />
      <section className="flex md:hidden w-full h-screen">
        <StatusSidebar />
      </section>
      <div className="hidden md:flex items-center justify-center w-full h-full min-h-screen bg-[#232323] text-gray-400">
        <p className="text-gray-300 text-sm">
          Klik pada card untuk melihat status
        </p>
      </div>
    </div>
  );
}
