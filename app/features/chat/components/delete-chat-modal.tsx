import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "shared/shadcn/alert-dialog";
import { Button } from "shared/shadcn/button";
import { Label } from "shared/shadcn/label";
import { RadioGroup, RadioGroupItem } from "shared/shadcn/radio-group";

interface DeleteChatModal {
  onOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  chatId: string;
}

export default function DeleteChatModal({
  onOpen,
  onOpenChange,
  chatId,
}: DeleteChatModal) {
  const [deleteType, setDeleteType] = React.useState<"all" | "self" | "">("");

  const deleteOption = [
    {
      text: "Hapus untuk saya",
      value: "self",
    },
    {
      text: "Hapus untuk semua orang",
      value: "all",
    },
  ];

  const handleDelete = () => {
    if (deleteType === "all") {
      return;
    } else {
      return;
    }
  };

  React.useEffect(() => {
    setDeleteType("");
  }, [onOpen, setDeleteType]);

  return (
    <AlertDialog open={onOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="flex flex-col items-center justify-between min-w-[30%] min-h-40 bg-[#303030] p-0 overflow-hidden border-none z-50">
        <div className="flex flex-col w-full p-5 px-7 gap-3">
          <Label className="text-white font-semibold text-xl">
            Hapus Pesan ?
          </Label>
          <Label className="text-white text-sm font-normal">
            Anda bisa menghapus pesan untuk orang lain atau diri sendiri.
          </Label>
          <RadioGroup
            onValueChange={(value) => {
              setDeleteType(value as "all" | "self" | "");
            }}
            className="flex flex-col items-start justify-center w-full text-white gap-3"
          >
            {deleteOption.map(({ text, value }, i) => {
              return (
                <Label
                  key={i}
                  className="flex items-center justify-start w-1/2 gap-2 text-[14px]"
                  htmlFor={`radio-${value}`}
                >
                  <RadioGroupItem
                    value={value}
                    className="w-5 h-5 text-transparent shadow-none border-gray-400"
                    id={`radio-${value}`}
                  />
                  <p>{text}</p>
                </Label>
              );
            })}
          </RadioGroup>
        </div>
        <div className="flex items-center justify-center w-full min-h-10 h-full bg-[#191919] gap-5 p-5 px-10">
          <Button
            onClick={handleDelete}
            className="w-1/2 bg-blue-600 hover:bg-blue-400"
          >
            Hapus
          </Button>
          <AlertDialogCancel className="w-1/2 bg-[#303030] text-white font-semibold border-none hover:bg-[#353535] hover:text-white">
            Batal
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
