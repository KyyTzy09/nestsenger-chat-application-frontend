import { ArrowLeftIcon, XCircleIcon } from "lucide-react";
import React from "react";
import { defaultImage } from "shared/constants/image-default";
import { Button } from "shared/shadcn/button";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import type { FriendType } from "shared/types/friend-type";
import FriendCard from "~/features/friends/components/cards/friend-card";

interface AddGroupSectionProps {
  friends: FriendType[];
  onClose: () => void;
}

export default function AddGroupSection({
  friends,
  onClose,
}: AddGroupSectionProps) {
  const [search, setSearch] = React.useState<string>("");
  const sampleArray = Array.from({ length: 50 });

  const filteredFriends = friends?.filter(({ alias }) => {
    return alias.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <section className="flex flex-col w-full h-full gap-3 text-white">
      <div className="flex items-center justify-start w-full gap-3">
        <Button onClick={onClose} className="w-10 h-10 bg-transparent">
          <ArrowLeftIcon />
        </Button>
        <Label className="text-white font-semibold text-lg">Grup Baru</Label>
      </div>
      <div className="flex flex-col items-center justify-center w-full px-3 gap-2">
        {sampleArray.length > 0 && (
          <div className="grid grid-cols-3 w-full max-h-20 gap-2 overflow-y-scroll custom-scroll border border-blue-500 p-1 rounded">
            {sampleArray.map((_, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center justify-start w-full h-6 line-clamp-1 bg-blue-500 px-1 rounded gap-1"
                >
                  <img
                    src={defaultImage}
                    alt={defaultImage}
                    className="w-5 h-5 rounded-full"
                  />
                  <p className="text-[10px] max-w-[80%] line-clamp-1">
                    Pengguna
                  </p>
                  <button title="delete" className="w-5 h-5">
                    <XCircleIcon className="w-full h-full" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {sampleArray.length > 0 && (
          <div className="flex items-center justify-center w-full h-8 gap-1">
            <Button className="flex items-center justify-center w-1/2 h-full bg-blue-500">
              Lanjut
            </Button>
            <Button
              onClick={onClose}
              className="flex items-center justify-center w-1/2 h-full bg-transparent h"
            >
              Batal
            </Button>
          </div>
        )}
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari"
          className="flex w-full p-2 h-8 text-white border-b-2 border-b-blue-500 selection:bg-blue-400 focus-visible:outline-none focus-visible:ring-0 rounded"
        />
      </div>
      <div className="flex items-center w-full">
        <FriendCard data={filteredFriends} />
      </div>
    </section>
  );
}
