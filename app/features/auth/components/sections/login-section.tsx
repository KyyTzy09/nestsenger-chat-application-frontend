import { Label } from "@radix-ui/react-label";
import LoginForm from "../forms/login-form";
import { Separator } from "shared/shadcn/separator";
import { KeyIcon } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";

export default function LoginSection() {
  const loginList = [
    {
      Icon: FaUserEdit,
      title: "Masukan nama/email",
      desc: "Masukan nama atau email Nestsenger anda.",
    },
    {
      Icon: KeyIcon,
      title: "Masukan password anda",
      desc: "Masukan password akun Nestenger anda.",
    },
  ];

  return (
      <div className="flex flex-col lg:flex-row items-start justify-between w-full h-full md:min-h-96 py-6 px-8 gap-10 lg:gap-2">
        <LoginForm />
        <Separator
          orientation="vertical"
          className="hidden lg:flex mx-2 border-black border h-[24rem]"
        />
        <Separator
          orientation="horizontal"
          className="flex lg:hidden mx-2 border-black border w-full"
        />
        <section className="flex flex-col items-start justify-start w-full lg:w-1/2 h-full px-3 lg:px-4 gap-5">
          <div className="flex flex-col items-start justify-center w-full">
            <Label className="w-full text-xl font-semibold break-all">
              Cara masuk ke <span className="text-blue-600">Nestsenger</span>
            </Label>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full gap-5">
            {loginList.map(({ Icon, desc, title }, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col items-start justify-center w-full text-start"
                >
                  <Label className="flex items-center justify-start text-blue-600 font-bold text-lg gap-1">
                    {i + 1}. <Icon className="w-5 h-5" />
                    {title}
                  </Label>
                  <p className="text-md">{desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
  );
}
