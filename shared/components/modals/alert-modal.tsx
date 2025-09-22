import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "shared/shadcn/alert-dialog";
import { Button } from "shared/shadcn/button";
import { Label } from "shared/shadcn/label";

interface AlertModalProps {
  alertTitle: string;
  alertDesc: string;
  onOpen: boolean;
  setOnOpen: (value: boolean) => void;
  onConfirm: () => void;
}

export default function AlertModal({
  alertTitle,
  alertDesc,
  onOpen,
  setOnOpen,
  onConfirm,
}: AlertModalProps) {
  return (
    <AlertDialog open={onOpen} onOpenChange={setOnOpen}>
      <AlertDialogContent className="flex flex-col items-center justify-between w-[25%] min-h-40 bg-[#303030] p-0 overflow-hidden border-none">
        <div className="flex flex-col w-full p-5 px-7 gap-3">
          <Label className="text-white font-semibold text-xl">
            {alertTitle}
          </Label>
          <Label className="text-white text-sm font-normal">{alertDesc}</Label>
        </div>
        <div className="flex items-center justify-center w-full min-h-10 h-full bg-[#191919] gap-5 p-5 px-10">
          <Button
            onClick={onConfirm}
            className="w-1/2 bg-blue-600 hover:bg-blue-400"
          >
            Ya
          </Button>
          <AlertDialogCancel className="w-1/2 bg-[#303030] text-white font-semibold border-none hover:bg-[#353535] hover:text-white">
            Tidak
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
