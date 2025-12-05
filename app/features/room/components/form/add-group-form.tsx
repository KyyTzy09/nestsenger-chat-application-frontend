import { CameraIcon } from "lucide-react";
import React from "react";
import { Button } from "shared/shadcn/button";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";

export default function AddGroupForm() {
  return (
    <form className="flex flex-col items-center justify-between w-full h-full px-4 gap-4">
      <section className="flex flex-col items-center w-full gap-4">
        <div className="flex items-center justify-start gap-2 w-full">
          <Label className="flex items-center justify-center w-12 h-12 bg-[#202020] rounded-full p-3">
            <CameraIcon className="w-full h-full" />
            <input type="file" title="hidden" className="hidden w-full" />
          </Label>
          <Label className="text-gray-200">Tambah Ikon Grup</Label>
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-2">
          <Label>Berikan Nama Grup</Label>
          <Input
            placeholder="Nama Grup"
            className="w-full h-8 bg-[#303030] ring-0 border-b-3 border-b-blue-500 focus-visible:ring-0 selection:bg-blue-400 focus-visible:border-b-blue-500 rounded"
          />
        </div>
      </section>
      <section className="flex items-center justify-center self-end-safe w-full h-8 gap-1">
        <Button
          onClick={() => {}}
          className="flex items-center justify-center w-1/2 h-full bg-blue-500 hover:bg-blue-300"
        >
          Lanjut
        </Button>
        <Button className="flex items-center justify-center w-1/2 h-full bg-transparent h">
          Batal
        </Button>
      </section>
    </form>
  );
}
