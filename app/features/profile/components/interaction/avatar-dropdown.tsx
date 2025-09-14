import { EditIcon, EyeIcon, Trash } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "shared/shadcn/dropdown-menu";

interface AvatarDropDownProps {
  image: string;
  children: React.ReactNode;
}

export default function AvatarDropDown({
  image,
  children,
}: AvatarDropDownProps) {
  const items = [
    {
      name: "Lihat Gambar",
      Icon: EyeIcon,
      disabled: image === defaultImage,
      Action: () => {},
    },
    {
      name: "Ubah Gambar",
      Icon: EditIcon,
      disabled: false,
      Action: () => {},
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#252525] border-none" side="top">
        <DropdownMenuItem
          disabled={image === defaultImage}
          onClick={() => {}}
          className="flex items-center justify-start gap-2 focus:bg-[#353535] rounded-sm"
        >
          <Trash className="text-white w-4 h-4" strokeWidth={1.5} />
          <p className="text-white font-normal">Hapus Gambar</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="opacity-30" />
        {items.map((item) => {
          return (
            <DropdownMenuItem
              disabled={item.disabled}
              onClick={item.Action}
              key={item.name}
              className="flex items-center justify-start gap-2 focus:bg-[#353535]"
            >
              <item.Icon className="text-white w-4 h-4" strokeWidth={1.5} />
              <p className="text-white font-normal">{item.name}</p>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
