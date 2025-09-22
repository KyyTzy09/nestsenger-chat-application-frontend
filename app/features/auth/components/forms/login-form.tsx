import { KeyIcon, LoaderIcon, MailIcon } from "lucide-react";
import React from "react";
import { Button } from "shared/shadcn/button";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import { useForm } from "react-hook-form";
import { loginSchema, type loginType } from "shared/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks/auth-hook";

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { mutate: onLoginPost, isPending } = useLogin();
  const onSubmit = (data: loginType) => {
    onLoginPost(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-between w-full lg:w-1/2 h-full px-3 lg:px-5 gap-5"
    >
      <section className="w-full flex flex-col gap-1">
        <label className="text-black font-semibold text-xl">
          Masuk Ke <span className="text-blue-600">Nestsenger</span>
        </label>
        <p className="text-black text-sm">
          Masuk menggunakan akun yang telah anda buat sebelumnya.
        </p>
      </section>
      <section className="flex flex-col items-center justify-start w-full h-full gap-3">
        <div className="w-full flex flex-col gap-2">
          <Label
            className="flex items-center justify-start text-black font-semibold text-[12px] gap-1"
            htmlFor="email"
          >
            <MailIcon className="w-3 h-3 text-gray-500" />
            Email / Username
          </Label>
          <Input
            {...register("email")}
            id="email"
            className="w-full h-10"
            placeholder="Masukan email/username"
          />
          {errors.email && (
            <p className="text-red-600 text-[12px] font-semibold self-start">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label
            className="flex items-center justify-start text-black font-semibold w-full text-[12px] gap-1"
            htmlFor="password"
          >
            <KeyIcon className="w-3 h-3 text-gray-500" />
            Password
          </Label>
          <Input
            {...register("password")}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="w-full h-10 fill-white"
            placeholder="Masukan kata sandi"
          />
          {errors.password && (
            <p className="text-red-600 text-[12px] font-semibold self-start">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="w-full gap-2 items-center flex justify-start">
          <Input
            id="checkbox"
            onChange={() => setShowPassword((prev) => !prev)}
            type="checkbox"
            className="w-3 h-3 bg-background"
          />
          <Label className="text-[12px]" htmlFor="checkbox">
            Lihat Passsword
          </Label>
        </div>
      </section>
      <Button
        type="submit"
        className="flex items-center justify-center mt-3 w-full bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400/75 hover:opacity-70 cursor-pointer transition duration-700"
      >
        {isPending ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Login"}
      </Button>
    </form>
  );
}
