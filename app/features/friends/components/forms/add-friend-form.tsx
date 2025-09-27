import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, MailIcon, PlusIcon } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { defaultImage } from "shared/constants/image-default";
import {
  addFriendSchema,
  type addFriendType,
} from "shared/schemas/friend-schema";
import { Button } from "shared/shadcn/button";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import type { UserType } from "shared/types/user-type";
import { useAddFriendMutation } from "../../hooks/friend-hook";

interface AddFriendFormProps {
  data: UserType;
  isLoading: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddFriendForm({
  data,
  isLoading,
  setIsOpen,
}: AddFriendFormProps) {
  const { mutate: addFriendMutate, isPending } =
    useAddFriendMutation(setIsOpen);
  const {
    userId: friendId,
    email,
    profile: { avatar, userName },
  } = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      alias: "",
    },
    resolver: zodResolver(addFriendSchema),
  });

  const onSubmit = (data: addFriendType) => {
    addFriendMutate({ alias: data.alias, friendId });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full h-full gap-5"
    >
      <section className="flex items-center justify-start w-full">
        <Label>Pengguna</Label>
      </section>
      <section className="flex items-center justify-center w-full">
        {!isLoading && (
          <div className="flex items-center justify-start w-full h-[75px] rounded-sm p-2 gap-2 bg-[#45494f]">
            <section className="w-[75px] h-full">
              <img
                src={avatar ? avatar : defaultImage}
                alt="Default"
                className="w-full h-full rounded-full"
              />
            </section>
            <section className="flex flex-col items-center justify-start w-full h-full p-1">
              <div className="flex items-center justify-between w-full text-sm text-white font-semibold">
                <p>{userName || ""}</p>
              </div>
              <div className="flex items-center justify-start w-full text-white">
                <p className="flex items-center justify-center gap-2 text-[12px]">
                  <MailIcon className="w-4 h-4" />
                  {email || "email@gmail.com"}
                </p>
              </div>
            </section>
          </div>
        )}
      </section>
      <section className="w-full flex flex-col gap-5">
        <div className="flex flex-col w-full gap-2">
          <div className="flex w-full gap-2">
            <Label>Simpan sebagai</Label>
            <Input
              {...register("alias")}
              className="flex w-full bg-[#404040] border-blue-600 border-b-2 border-t-0 border-x-0"
              placeholder="Masukan nama yang ingin disimpan"
            />
          </div>
          {errors.alias && (
            <p className="text-red-600 text-[12px] font-semibold self-start">
              {errors.alias.message}
            </p>
          )}
        </div>
        <Button className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-300 font-semibold transition">
          {isPending ? (
            <LoaderIcon className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Tambahkan
              <PlusIcon className="w-4 h-4" />
            </>
          )}
        </Button>
      </section>
    </form>
  );
}
