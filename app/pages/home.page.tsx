import { SendIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import AuthTabs from "~/features/auth/components/auth-tabs";

export default function HomePage() {
  return (
    <div className="p-5 flex flex-col items-center w-full h-full min-h-screen gap-6">
      <div className="flex items-center justify-between w-full">
        <p className="flex items-center text-blue-600 font-bold text-xl">
          <SendIcon className="w-5 h-5 mr-1" /> Nest
          <span className="text-black">senger</span>
        </p>
      </div>
      <section className="flex flex-col p-5 md:px-10 items-center justify-center gap-2 bg-white w-full md:w-[65%] h-full border-black border rounded-lg">
        <div className="flex items-center justify-start w-full gap-4">
          <FaWhatsapp className="w-16 h-16 text-blue-600" />
          <div className="flex flex-col w-full h-full items-start justify-center">
            <p className="text-blue-600 font-semibold text-xl">
              Nest<span className="text-black">senger</span>
            </p>
            <p className="text-black ">
              Aplikasi chat realtime mirip seperti Whatsapp, dengan fitur fitur
              yang lengkap dan cepat, serta dibangun dengan <b>maksimal</b>{" "}
              untuk pengalaman pengguna yang lebih baik.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full md:w-[65%] h-full relative">
        <AuthTabs />
      </section>
    </div>
  );
}
