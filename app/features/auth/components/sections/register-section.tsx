import React from "react";
import RegisterForm from "../forms/register-form";
import { Separator } from "shared/shadcn/separator";
import { Label } from "shared/shadcn/label";
import { KeyIcon, MailIcon, TagIcon } from "lucide-react";

interface RegisterSectionProps {
  setValue: (value: string) => void;
}

export default function RegisterSection({ setValue }: RegisterSectionProps) {
  const registerList = [
    {
      Icon: TagIcon,
      title: "Masukan nama",
      desc: "Buat nama panggilan sesuai keinginan anda",
    },
    {
      Icon: MailIcon,
      title: "Masukan email",
      desc: "Masukan email valid & aktif, usahakan email yang belum pernah terdaftar",
    },
    {
      Icon: KeyIcon,
      title: "Buat password baru",
      desc: "Buat Password yang kuat untuk melindungi akun anda dengan ketentuan minimal 8 karakter",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between w-full h-full md:min-h-96 py-6 px-8 gap-10 lg:gap-2">
      <RegisterForm setValue={setValue} />
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
            Panduan Membuat akun{" "}
            <span className="text-blue-600">Nestsenger</span> baru
          </Label>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full gap-5">
          {registerList.map(({ Icon, desc, title }, i) => {
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
